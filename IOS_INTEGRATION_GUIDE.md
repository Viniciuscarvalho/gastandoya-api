# 📱 Guia de Integração iOS - GastandoYa + Notion

## Implementação do userId no App iOS

Como sua aplicação **não tem sistema de login**, você precisa gerar um ID único por dispositivo/instalação.

## 1. Criar Helper de UserID

```swift
// UserIDManager.swift
import Foundation

class UserIDManager {
    static let shared = UserIDManager()
    private let userIdKey = "gastandoya_user_id"
    
    /// Retorna o userId persistente. Se não existir, cria um novo.
    func getUserId() -> String {
        // Verificar se já existe
        if let existingId = UserDefaults.standard.string(forKey: userIdKey) {
            print("📱 Using existing userId: \(existingId)")
            return existingId
        }
        
        // Gerar novo UUID
        let newId = UUID().uuidString
        UserDefaults.standard.set(newId, forKey: userIdKey)
        print("🆔 Generated new userId: \(newId)")
        
        return newId
    }
    
    /// Remove o userId (útil para desconectar/reset)
    func resetUserId() {
        UserDefaults.standard.removeObject(forKey: userIdKey)
        print("🗑️ UserId removed")
    }
}
```

## 2. Criar Serviço de Integração com Notion

```swift
// NotionService.swift
import Foundation
import SafariServices

class NotionService {
    static let shared = NotionService()
    
    private let baseURL = "https://api.gastandoya.com.br" // ou gastandoya-api.vercel.app
    private let apiKey = "SUA_APP_API_KEY_AQUI" // Mesmo valor de APP_API_KEY no backend
    
    // MARK: - OAuth Flow
    
    /// Inicia o fluxo OAuth com o Notion
    func connectNotion(from viewController: UIViewController) {
        let userId = UserIDManager.shared.getUserId()
        
        // Construir URL
        var components = URLComponents(string: "\(baseURL)/api/notion/oauth/authorize")!
        components.queryItems = [
            URLQueryItem(name: "userId", value: userId)
        ]
        
        guard let url = components.url else {
            print("❌ Failed to create authorization URL")
            return
        }
        
        print("🔗 Opening OAuth URL: \(url.absoluteString)")
        
        // Abrir Safari View Controller
        let safariVC = SFSafariViewController(url: url)
        safariVC.dismissButtonStyle = .close
        viewController.present(safariVC, animated: true)
    }
    
    // MARK: - Database Configuration
    
    /// Configura o database de despesas do Notion
    func configureDatabaseId(_ databaseId: String, completion: @escaping (Result<Void, Error>) -> Void) {
        let userId = UserIDManager.shared.getUserId()
        
        guard let url = URL(string: "\(baseURL)/api/notion/config/database") else {
            completion(.failure(NotionError.invalidURL))
            return
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue(apiKey, forHTTPHeaderField: "x-api-key")
        request.setValue(userId, forHTTPHeaderField: "x-user-id")
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let body = ["databaseId": databaseId]
        request.httpBody = try? JSONEncoder().encode(body)
        
        URLSession.shared.dataTask(with: request) { data, response, error in
            if let error = error {
                DispatchQueue.main.async {
                    completion(.failure(error))
                }
                return
            }
            
            guard let httpResponse = response as? HTTPURLResponse else {
                DispatchQueue.main.async {
                    completion(.failure(NotionError.invalidResponse))
                }
                return
            }
            
            if httpResponse.statusCode == 200 {
                print("✅ Database configured successfully")
                DispatchQueue.main.async {
                    completion(.success(()))
                }
            } else {
                print("❌ Failed to configure database: \(httpResponse.statusCode)")
                DispatchQueue.main.async {
                    completion(.failure(NotionError.httpError(httpResponse.statusCode)))
                }
            }
        }.resume()
    }
    
    // MARK: - Fetch Expenses
    
    /// Busca as despesas do Notion
    func fetchExpenses(completion: @escaping (Result<[ExpenseDTO], Error>) -> Void) {
        let userId = UserIDManager.shared.getUserId()
        
        guard let url = URL(string: "\(baseURL)/api/notion/expenses") else {
            completion(.failure(NotionError.invalidURL))
            return
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = "GET"
        request.setValue(apiKey, forHTTPHeaderField: "x-api-key")
        request.setValue(userId, forHTTPHeaderField: "x-user-id")
        
        print("📡 Fetching expenses for userId: \(userId)")
        
        URLSession.shared.dataTask(with: request) { data, response, error in
            if let error = error {
                print("❌ Network error:", error.localizedDescription)
                DispatchQueue.main.async {
                    completion(.failure(error))
                }
                return
            }
            
            guard let httpResponse = response as? HTTPURLResponse else {
                DispatchQueue.main.async {
                    completion(.failure(NotionError.invalidResponse))
                }
                return
            }
            
            print("📊 Response status: \(httpResponse.statusCode)")
            
            guard let data = data else {
                DispatchQueue.main.async {
                    completion(.failure(NotionError.noData))
                }
                return
            }
            
            // Debug: print response
            if let jsonString = String(data: data, encoding: .utf8) {
                print("📦 Response body:", jsonString)
            }
            
            switch httpResponse.statusCode {
            case 200:
                do {
                    let expenses = try JSONDecoder().decode([ExpenseDTO].self, from: data)
                    print("✅ Decoded \(expenses.count) expenses")
                    DispatchQueue.main.async {
                        completion(.success(expenses))
                    }
                } catch {
                    print("❌ Decode error:", error)
                    DispatchQueue.main.async {
                        completion(.failure(error))
                    }
                }
                
            case 401:
                print("❌ Unauthorized - check API key")
                DispatchQueue.main.async {
                    completion(.failure(NotionError.unauthorized))
                }
                
            case 404:
                print("⚠️ User not connected to Notion")
                DispatchQueue.main.async {
                    completion(.failure(NotionError.notConnected))
                }
                
            default:
                print("❌ HTTP error: \(httpResponse.statusCode)")
                DispatchQueue.main.async {
                    completion(.failure(NotionError.httpError(httpResponse.statusCode)))
                }
            }
        }.resume()
    }
}

// MARK: - Models

struct ExpenseDTO: Codable {
    let id: String
    let description: String
    let date: String
    let amount: Int // em centavos
    let currency: String
    let category: String?
    let createdAt: String
    let updatedAt: String?
}

// MARK: - Errors

enum NotionError: LocalizedError {
    case invalidURL
    case invalidResponse
    case noData
    case unauthorized
    case notConnected
    case httpError(Int)
    
    var errorDescription: String? {
        switch self {
        case .invalidURL:
            return "URL inválida"
        case .invalidResponse:
            return "Resposta inválida do servidor"
        case .noData:
            return "Nenhum dado recebido"
        case .unauthorized:
            return "Não autorizado - verifique a API key"
        case .notConnected:
            return "Você ainda não conectou sua conta Notion"
        case .httpError(let code):
            return "Erro HTTP \(code)"
        }
    }
}
```

## 3. Usar no ViewController

```swift
// SettingsViewController.swift
import UIKit
import SafariServices

class SettingsViewController: UIViewController {
    
    // MARK: - IBActions
    
    @IBAction func connectNotionButtonTapped(_ sender: UIButton) {
        print("🔵 Connect Notion button tapped")
        NotionService.shared.connectNotion(from: self)
    }
    
    @IBAction func configureDatabaseButtonTapped(_ sender: UIButton) {
        // Mostrar dialog para usuário inserir o Database ID
        showDatabaseIdInput()
    }
    
    @IBAction func syncExpensesButtonTapped(_ sender: UIButton) {
        print("🔄 Syncing expenses...")
        
        NotionService.shared.fetchExpenses { result in
            switch result {
            case .success(let expenses):
                print("✅ Fetched \(expenses.count) expenses")
                self.saveExpensesToSwiftData(expenses)
                self.showSuccessAlert(message: "\(expenses.count) despesas sincronizadas!")
                
            case .failure(let error):
                print("❌ Error:", error.localizedDescription)
                
                if case NotionError.notConnected = error {
                    self.showNotConnectedAlert()
                } else {
                    self.showErrorAlert(message: error.localizedDescription)
                }
            }
        }
    }
    
    // MARK: - Helper Methods
    
    private func showDatabaseIdInput() {
        let alert = UIAlertController(
            title: "Configurar Database",
            message: "Cole o ID do seu database de despesas do Notion",
            preferredStyle: .alert
        )
        
        alert.addTextField { textField in
            textField.placeholder = "abc123def456..."
            textField.autocapitalizationType = .none
        }
        
        alert.addAction(UIAlertAction(title: "Cancelar", style: .cancel))
        alert.addAction(UIAlertAction(title: "Salvar", style: .default) { _ in
            guard let databaseId = alert.textFields?.first?.text, !databaseId.isEmpty else {
                return
            }
            
            NotionService.shared.configureDatabaseId(databaseId) { result in
                switch result {
                case .success:
                    self.showSuccessAlert(message: "Database configurado com sucesso!")
                case .failure(let error):
                    self.showErrorAlert(message: error.localizedDescription)
                }
            }
        })
        
        present(alert, animated: true)
    }
    
    private func saveExpensesToSwiftData(_ expenses: [ExpenseDTO]) {
        // TODO: Implementar salvamento em SwiftData
        print("💾 Saving \(expenses.count) expenses to SwiftData...")
        
        for expense in expenses {
            print("  - \(expense.description): R$ \(Double(expense.amount) / 100.0)")
        }
    }
    
    private func showSuccessAlert(message: String) {
        let alert = UIAlertController(title: "✅ Sucesso", message: message, preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "OK", style: .default))
        present(alert, animated: true)
    }
    
    private func showErrorAlert(message: String) {
        let alert = UIAlertController(title: "❌ Erro", message: message, preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "OK", style: .default))
        present(alert, animated: true)
    }
    
    private func showNotConnectedAlert() {
        let alert = UIAlertController(
            title: "Notion não conectado",
            message: "Você precisa conectar sua conta Notion primeiro.",
            preferredStyle: .alert
        )
        alert.addAction(UIAlertAction(title: "Cancelar", style: .cancel))
        alert.addAction(UIAlertAction(title: "Conectar", style: .default) { _ in
            self.connectNotionButtonTapped(UIButton())
        })
        present(alert, animated: true)
    }
}
```

## 4. Fluxo Completo

### ✅ Fluxo Implementado

```
1. App iOS
   ├─ Gera/recupera userId único (UUID) via UserIDManager
   ├─ Constrói URL: GET /api/notion/oauth/authorize?userId={uuid}
   └─ Abre Safari View Controller

2. Backend Next.js (authorize)
   ├─ Recebe userId do query param
   ├─ Valida se userId existe
   ├─ Gera state CSRF (contém userId)
   └─ Redireciona para Notion OAuth

3. Notion
   ├─ Usuário autoriza o app
   └─ Redireciona: GET /api/notion/oauth/callback?code={code}&state={state}

4. Backend Next.js (callback)
   ├─ Recebe code e state
   ├─ Valida state e extrai userId
   ├─ Troca code por access_token (POST /v1/oauth/token)
   ├─ Salva conexão: userId → {accessToken, workspaceId}
   └─ Redireciona: GET /notion/success?userId={uuid}

5. Página de Sucesso
   ├─ Mostra mensagem de sucesso
   └─ Exibe userId mascarado

6. App iOS
   ├─ Usuário fecha Safari
   └─ Agora pode chamar GET /api/notion/expenses
```

## 5. Como Obter o Database ID do Notion

### Método 1: Via URL do Database

1. Abra o database no Notion (navegador)
2. A URL será algo como:
   ```
   https://www.notion.so/workspace/abc123def456?v=xyz789
                               ^^^^^^^^^^^^^^^^
                               Este é o Database ID
   ```
3. Copie os caracteres entre `/workspace/` e `?v=`
4. Remova os hífens: `abc123def456` → `abc123def456`

### Método 2: Via Share Link

1. No database, clique em "Share"
2. Clique em "Copy link"
3. O link será: `https://notion.so/{workspace}/abc123def456`
4. Copie o ID final

### Método 3: Via API (Avançado)

```swift
// Lista todos os databases que o usuário tem acesso
// Endpoint: GET https://api.notion.com/v1/search
// Header: Authorization: Bearer {access_token}
// Body: { "filter": { "property": "object", "value": "database" } }
```

## 6. Debug - Checklist de Erro 400

### ✅ O que verificar no iOS:

```swift
// 1. Verificar se userId está sendo gerado
let userId = UserIDManager.shared.getUserId()
print("📱 userId:", userId)
print("📱 userId.isEmpty:", userId.isEmpty)

// 2. Verificar URL completa
var components = URLComponents(string: "\(baseURL)/api/notion/oauth/authorize")!
components.queryItems = [URLQueryItem(name: "userId", value: userId)]
print("📱 Full URL:", components.url?.absoluteString ?? "nil")

// 3. Verificar se SFSafariViewController recebe a URL correta
let url = components.url!
print("📱 Opening URL:", url.absoluteString)
let safariVC = SFSafariViewController(url: url)
// ...
```

### ✅ O que verificar no Backend (Vercel Logs):

```bash
# Ver logs em tempo real
vercel logs --follow

# Procurar por:
# ✅ "OAuth Authorize called" - endpoint foi chamado
# ✅ "userId: ABC-123" - userId chegou
# ❌ "Missing userId parameter" - userId não chegou ou está vazio
```

### ✅ Teste Manual no Navegador:

```
https://api.gastandoya.com.br/api/notion/oauth/authorize?userId=test-123
```

**Resultado esperado:** Redirecionamento para `https://api.notion.com/v1/oauth/authorize?client_id=...`

## 7. Exemplo de Logs Corretos

### iOS (Xcode Console):

```
📱 userId: 12345678-ABCD-EFGH-IJKL-123456789012
📱 userId.isEmpty: false
📱 Full URL: https://api.gastandoya.com.br/api/notion/oauth/authorize?userId=12345678-ABCD-EFGH-IJKL-123456789012
📱 Opening URL: https://api.gastandoya.com.br/api/notion/oauth/authorize?userId=12345678-ABCD-EFGH-IJKL-123456789012
```

### Backend (Vercel):

```
📝 OAuth Authorize called
URL: https://api.gastandoya.com.br/api/notion/oauth/authorize?userId=12345678-ABCD-EFGH-IJKL-123456789012
userId: 12345678-ABCD-EFGH-IJKL-123456789012
✅ State generated for user: 12345678-ABCD-EFGH-IJKL-123456789012
🔀 Redirecting to: https://api.notion.com/v1/oauth/authorize?client_id=...&redirect_uri=...&state=...
```

### Notion Callback (Vercel):

```
📝 OAuth Callback called
URL: https://api.gastandoya.com.br/api/notion/oauth/callback?code=abc123&state=def456
Received params: { code: 'present', state: 'present', error: null }
🔐 Validating state...
✅ State validated, userId: 12345678-ABCD-EFGH-IJKL-123456789012
🔄 Exchanging code for token...
✅ Token received from Notion
💾 Saving connection to store...
✅ Notion connection created for user 12345678-ABCD-EFGH-IJKL-123456789012
🔀 Redirecting to: https://api.gastandoya.com.br/notion/success?userId=12345678-ABCD-EFGH-IJKL-123456789012
```

## 🎯 Resumo Rápido

1. **Crie `UserIDManager`** → Gera UUID persistente
2. **Passe `userId` na URL** → `/authorize?userId={uuid}`
3. **Backend recebe e valida** → Se não tiver = 400
4. **Backend salva conexão** → `userId → {accessToken}`
5. **App usa userId** → Em todas as chamadas de API

**Não precisa de login ou cadastro!** Cada instalação do app tem seu próprio UUID único. 🚀

