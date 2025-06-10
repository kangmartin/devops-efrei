// Configuration globale pour les tests
import { beforeEach } from 'vitest'

// Mock du DOM pour les tests
beforeEach(() => {
  // Nettoyer le DOM avant chaque test
  document.body.innerHTML = ''
})