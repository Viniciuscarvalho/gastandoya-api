/**
 * Testes unitários para utilitários de configuração OAuth
 */

import { generateOAuthState, validateOAuthState } from '@/lib/config'

describe('OAuth State Management', () => {
  describe('generateOAuthState', () => {
    it('deve gerar um state válido contendo o userId', () => {
      const userId = 'test-user-123'
      const state = generateOAuthState(userId)
      
      expect(state).toBeTruthy()
      expect(state).toContain(userId)
      expect(state.split(':')).toHaveLength(3)
    })

    it('deve gerar states diferentes para chamadas sucessivas', () => {
      const userId = 'test-user-123'
      const state1 = generateOAuthState(userId)
      const state2 = generateOAuthState(userId)
      
      expect(state1).not.toBe(state2)
    })
  })

  describe('validateOAuthState', () => {
    it('deve validar um state recém-gerado corretamente', () => {
      const userId = 'test-user-123'
      const state = generateOAuthState(userId)
      
      const extractedUserId = validateOAuthState(state)
      expect(extractedUserId).toBe(userId)
    })

    it('deve rejeitar um state com formato inválido', () => {
      const invalidState = 'invalid-format'
      const result = validateOAuthState(invalidState)
      
      expect(result).toBeNull()
    })

    it('deve rejeitar um state muito antigo (expirado)', () => {
      // Gerar um state com timestamp antigo (11 minutos atrás)
      const userId = 'test-user-123'
      const elevenMinutesAgo = Date.now() - 11 * 60 * 1000
      const expiredState = `${userId}:${elevenMinutesAgo.toString(36)}:abc123`
      
      const result = validateOAuthState(expiredState)
      expect(result).toBeNull()
    })

    it('deve aceitar um state recente (dentro do limite de 10 minutos)', () => {
      // Gerar um state com timestamp de 5 minutos atrás
      const userId = 'test-user-123'
      const fiveMinutesAgo = Date.now() - 5 * 60 * 1000
      const validState = `${userId}:${fiveMinutesAgo.toString(36)}:abc123`
      
      const result = validateOAuthState(validState)
      expect(result).toBe(userId)
    })
  })
})









