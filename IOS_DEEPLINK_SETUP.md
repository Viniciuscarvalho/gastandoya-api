# 🔗 Configuração de Deep Link no iOS - GastandoYa

## O que é Deep Link?

Deep links permitem que URLs customizadas abram seu app diretamente. Neste caso, usamos `gastandoya://` para retornar automaticamente ao app após a autorização do Notion.

## 1. Configurar URL Scheme no Xcode

### Passo 1: Abrir Configurações do Projeto

1. No Xcode, selecione o **Project Navigator** (⌘+1)
2. Clique no projeto **GastandoYa** (ícone azul)
3. Selecione o **Target** do app
4. Vá para a aba **Info**

### Passo 2: Adicionar URL Type

1. Role até a seção **URL Types**
2. Clique no **+** para adicionar novo URL Type
3. Configure:
   - **Identifier**: `com.gastandoya.app`
   - **URL Schemes**: `gastandoya`
   - **Role**: Editor

Isso permite que URLs como `gastandoya://notion/callback` abram seu app.

## 2. Implementar Handler de Deep Link

### Opção A: Para Apps com SwiftUI (iOS 14+)

```swift
// App.swift ou ContentView.swift
import SwiftUI

@main
struct GastandoYaApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
                .onOpenURL { url in
                    handleDeepLink(url)
                }
        }
    }
    
    private func handleDeepLink(_ url: URL) {
        print("🔗 Deep link received:", url.absoluteString)
        
        // Verificar se é o callback do Notion
        guard url.scheme == "gastandoya",
              url.host == "notion",
              url.path == "/callback" else {
            print("⚠️ Unknown deep link")
            return
        }
        
        // Extrair query parameters
        let components = URLComponents(url: url, resolvingAgainstBaseURL: false)
        let queryItems = components?.queryItems ?? []
        
        // Verificar se foi sucesso ou erro
        if let successValue = queryItems.first(where: { $0.name == "success" })?.value,
           successValue == "true" {
            handleNotionSuccess()
        } else if let errorValue = queryItems.first(where: { $0.name == "error" })?.value {
            handleNotionError(errorValue)
        }
    }
    
    private func handleNotionSuccess() {
        print("✅ Notion connection successful!")
        
        // Mostrar notificação ou atualizar UI
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
            // Navegar para tela de configuração do database
            // ou mostrar alert de sucesso
            NotificationCenter.default.post(
                name: NSNotification.Name("NotionConnected"),
                object: nil
            )
        }
    }
    
    private func handleNotionError(_ error: String) {
        print("❌ Notion connection error:", error)
        
        let message: String
        switch error {
        case "authorization_denied":
            message = "Você negou o acesso ao Notion"
        case "missing_parameters":
            message = "Parâmetros ausentes na requisição"
        case "invalid_state":
            message = "Sessão inválida ou expirada"
        default:
            message = "Erro ao conectar: \(error)"
        }
        
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
            NotificationCenter.default.post(
                name: NSNotification.Name("NotionConnectionError"),
                object: nil,
                userInfo: ["message": message]
            )
        }
    }
}
```

### Opção B: Para Apps com UIKit (SceneDelegate)

```swift
// SceneDelegate.swift
import UIKit

class SceneDelegate: UIResponder, UIWindowSceneDelegate {
    
    var window: UIWindow?
    
    // Este método é chamado quando o app é aberto via deep link
    func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
        guard let url = URLContexts.first?.url else { return }
        handleDeepLink(url)
    }
    
    private func handleDeepLink(_ url: URL) {
        print("🔗 Deep link received:", url.absoluteString)
        
        // Verificar se é o callback do Notion
        guard url.scheme == "gastandoya",
              url.host == "notion",
              url.path == "/callback" else {
            print("⚠️ Unknown deep link")
            return
        }
        
        // Extrair query parameters
        let components = URLComponents(url: url, resolvingAgainstBaseURL: false)
        let queryItems = components?.queryItems ?? []
        
        // Verificar se foi sucesso ou erro
        if let successValue = queryItems.first(where: { $0.name == "success" })?.value,
           successValue == "true" {
            handleNotionSuccess()
        } else if let errorValue = queryItems.first(where: { $0.name == "error" })?.value {
            handleNotionError(errorValue)
        }
    }
    
    private func handleNotionSuccess() {
        print("✅ Notion connection successful!")
        
        // Fechar Safari View Controller se ainda estiver aberto
        if let topVC = window?.rootViewController?.topMostViewController() {
            if topVC is SFSafariViewController {
                topVC.dismiss(animated: true) {
                    self.showSuccessAlert()
                }
            } else {
                self.showSuccessAlert()
            }
        }
    }
    
    private func handleNotionError(_ error: String) {
        print("❌ Notion connection error:", error)
        
        let message: String
        switch error {
        case "authorization_denied":
            message = "Você negou o acesso ao Notion"
        case "missing_parameters":
            message = "Parâmetros ausentes na requisição"
        case "invalid_state":
            message = "Sessão inválida ou expirada"
        default:
            message = "Erro ao conectar: \(error)"
        }
        
        // Fechar Safari e mostrar erro
        if let topVC = window?.rootViewController?.topMostViewController() {
            if topVC is SFSafariViewController {
                topVC.dismiss(animated: true) {
                    self.showErrorAlert(message: message)
                }
            } else {
                self.showErrorAlert(message: message)
            }
        }
    }
    
    private func showSuccessAlert() {
        let alert = UIAlertController(
            title: "✅ Notion Conectado",
            message: "Sua conta foi conectada com sucesso! Configure agora qual database deseja usar.",
            preferredStyle: .alert
        )
        alert.addAction(UIAlertAction(title: "OK", style: .default))
        window?.rootViewController?.topMostViewController()?.present(alert, animated: true)
    }
    
    private func showErrorAlert(message: String) {
        let alert = UIAlertController(
            title: "❌ Erro",
            message: message,
            preferredStyle: .alert
        )
        alert.addAction(UIAlertAction(title: "OK", style: .default))
        window?.rootViewController?.topMostViewController()?.present(alert, animated: true)
    }
}

// Extension para encontrar o ViewController mais acima da hierarquia
extension UIViewController {
    func topMostViewController() -> UIViewController {
        if let presented = presentedViewController {
            return presented.topMostViewController()
        }
        if let navigation = self as? UINavigationController {
            return navigation.visibleViewController?.topMostViewController() ?? navigation
        }
        if let tab = self as? UITabBarController {
            return tab.selectedViewController?.topMostViewController() ?? tab
        }
        return self
    }
}
```

### Opção C: Para Apps com UIKit (AppDelegate) - iOS 12 e anteriores

```swift
// AppDelegate.swift
import UIKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
    
    var window: UIWindow?
    
    func application(_ app: UIApplication, 
                    open url: URL, 
                    options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
        handleDeepLink(url)
        return true
    }
    
    private func handleDeepLink(_ url: URL) {
        // Mesmo código do SceneDelegate acima
        print("🔗 Deep link received:", url.absoluteString)
        // ... resto do código
    }
}
```

## 3. Atualizar NotionService para Escutar Callbacks

```swift
// NotionService.swift
import Foundation
import SafariServices

class NotionService {
    static let shared = NotionService()
    
    private let baseURL = "https://api.gastandoya.com.br"
    private let apiKey = "SUA_APP_API_KEY_AQUI"
    
    // Observers para notificações
    init() {
        setupNotificationObservers()
    }
    
    private func setupNotificationObservers() {
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(handleNotionConnected),
            name: NSNotification.Name("NotionConnected"),
            object: nil
        )
        
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(handleNotionConnectionError(_:)),
            name: NSNotification.Name("NotionConnectionError"),
            object: nil
        )
    }
    
    @objc private func handleNotionConnected() {
        print("📱 Notion connection confirmed by deep link!")
        // Aqui você pode atualizar estado, fazer fetch de dados, etc.
    }
    
    @objc private func handleNotionConnectionError(_ notification: Notification) {
        if let message = notification.userInfo?["message"] as? String {
            print("📱 Notion connection error:", message)
        }
    }
    
    // ... resto do código do NotionService
}
```

## 4. Testar o Deep Link

### Teste 1: Via Safari (Simulador ou Device)

1. Abra o Safari no iOS
2. Digite na barra de endereços:
   ```
   gastandoya://notion/callback?success=true&userId=test-123
   ```
3. Pressione Enter
4. O app deve abrir automaticamente!

### Teste 2: Via Terminal (Simulador)

```bash
# Abrir simulador iOS
xcrun simctl openurl booted "gastandoya://notion/callback?success=true&userId=test-123"

# Para testar erro
xcrun simctl openurl booted "gastandoya://notion/callback?error=authorization_denied"
```

### Teste 3: Via Xcode Console (Debug)

```swift
// Durante execução do app, cole no Console do Xcode:
if let url = URL(string: "gastandoya://notion/callback?success=true&userId=test-123") {
    UIApplication.shared.open(url)
}
```

## 5. Fluxo Completo (Backend → iOS)

### Sucesso ✅

```
1. Backend (callback.ts):
   └─ return NextResponse.redirect("gastandoya://notion/callback?success=true&userId=ABC-123")

2. Safari redireciona para gastandoya://...

3. iOS abre o app automaticamente

4. SceneDelegate/App recebe URL:
   └─ scene(_:openURLContexts:) é chamado
   
5. handleDeepLink() processa:
   └─ Extrai success=true
   └─ Chama handleNotionSuccess()
   
6. UI é atualizada:
   └─ Alert de sucesso ou navegação para próxima tela
```

### Erro ❌

```
1. Backend (callback.ts):
   └─ return NextResponse.redirect("gastandoya://notion/callback?error=authorization_denied")

2. Safari redireciona para gastandoya://...

3. iOS abre o app automaticamente

4. SceneDelegate/App recebe URL

5. handleDeepLink() processa:
   └─ Extrai error=authorization_denied
   └─ Chama handleNotionError("authorization_denied")
   
6. UI é atualizada:
   └─ Alert com mensagem de erro
```

## 6. Possíveis Erros e Soluções

### Erro 1: "Safari cannot open the page"

**Causa:** URL Scheme não configurado corretamente

**Solução:**
1. Verificar se `gastandoya` está em **Info → URL Types → URL Schemes**
2. Limpar build: ⌘+Shift+K
3. Rebuild: ⌘+B
4. Reinstalar app no simulador

### Erro 2: App não abre após callback

**Causa:** Handler não implementado ou não registrado

**Solução:**
1. Verificar se `onOpenURL` (SwiftUI) ou `scene(_:openURLContexts:)` (UIKit) está implementado
2. Adicionar logs para debug:
   ```swift
   func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
       print("🔗 Deep link handler called")
       print("🔗 URLs received:", URLContexts.map { $0.url.absoluteString })
       // ...
   }
   ```

### Erro 3: Safari não redireciona automaticamente

**Causa:** Safari pode pedir confirmação em alguns casos

**Solução:**
- No iOS, o Safari mostra um banner "Abrir em GastandoYa?"
- Usuário precisa tocar no banner
- Isso é comportamento normal e esperado do iOS

### Erro 4: Deep link funciona no simulador mas não no device

**Causa:** Provisioning Profile ou Bundle ID incorreto

**Solução:**
1. Verificar Bundle Identifier: `com.gastandoya.app`
2. Verificar se o app está instalado corretamente no device
3. Desinstalar e reinstalar o app

## 7. URLs de Deep Link do Backend

O backend agora retorna estas URLs:

### ✅ Sucesso
```
gastandoya://notion/callback?success=true&userId={uuid}
```

### ❌ Erro: Autorização Negada
```
gastandoya://notion/callback?error=authorization_denied
```

### ❌ Erro: Parâmetros Ausentes
```
gastandoya://notion/callback?error=missing_parameters
```

### ❌ Erro: State Inválido
```
gastandoya://notion/callback?error=invalid_state
```

### ❌ Erro: Interno do Servidor
```
gastandoya://notion/callback?error={errorMessage}
```

## 8. Logs para Debug

### No iOS (Xcode Console):

```
🔗 Deep link received: gastandoya://notion/callback?success=true&userId=ABC-123
✅ Notion connection successful!
```

### No Backend (Vercel Logs):

```bash
vercel logs --follow

# Output esperado:
✅ Notion connection created for user ABC-123
🔀 Redirecting to iOS app (success): gastandoya://notion/callback?success=true&userId=ABC-123
```

## 9. Checklist de Implementação

- [ ] URL Scheme `gastandoya` adicionado no Xcode (Info → URL Types)
- [ ] Handler implementado (`onOpenURL` ou `scene(_:openURLContexts:)`)
- [ ] Parsing de query parameters implementado
- [ ] Tratamento de sucesso (`success=true`)
- [ ] Tratamento de erros (`error=...`)
- [ ] UI atualizada após callback (alert, navegação, etc.)
- [ ] Logs de debug adicionados
- [ ] Testado no simulador com `xcrun simctl openurl`
- [ ] Testado no device físico
- [ ] Safari View Controller fecha automaticamente após callback

## 10. Exemplo Completo de Fluxo

```swift
// 1. Usuário clica em "Conectar Notion"
NotionService.shared.connectNotion(from: self)

// 2. Safari abre com URL do backend
// https://api.gastandoya.com.br/api/notion/oauth/authorize?userId=ABC-123

// 3. Backend redireciona para Notion
// https://api.notion.com/v1/oauth/authorize?client_id=...

// 4. Usuário autoriza no Notion

// 5. Notion redireciona para backend
// https://api.gastandoya.com.br/api/notion/oauth/callback?code=...&state=...

// 6. Backend processa e redireciona para deep link
// gastandoya://notion/callback?success=true&userId=ABC-123

// 7. iOS abre o app automaticamente
// scene(_:openURLContexts:) é chamado

// 8. handleDeepLink() processa o callback
// Extrai success=true

// 9. UI é atualizada
// Alert de sucesso ou navegação

// 10. Usuário pode agora sincronizar despesas!
NotionService.shared.fetchExpenses { ... }
```

## 🎯 Resultado Final

Após implementar, o fluxo será:

1. **Usuário clica** "Conectar Notion" no app
2. **Safari abre** com tela de autorização do Notion
3. **Usuário autoriza** o acesso
4. **Safari fecha automaticamente**
5. **App volta** para primeiro plano
6. **Alert aparece**: "✅ Notion Conectado com Sucesso!"
7. **Próximo passo**: Configurar database ID

Tudo acontece de forma fluida sem o usuário precisar fechar manualmente o Safari! 🚀
