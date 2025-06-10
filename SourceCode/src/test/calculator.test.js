import { describe, it, expect, beforeEach } from 'vitest'
import { Calculator } from '../calculator.js'

describe('Calculator', () => {
  let calculator
  let previousElement
  let currentElement

  beforeEach(() => {
    // Créer des éléments DOM mock
    previousElement = { innerText: '' }
    currentElement = { innerText: '' }
    
    calculator = new Calculator(previousElement, currentElement)
  })

  describe('Initialisation', () => {
    it('devrait initialiser avec des valeurs par défaut', () => {
      expect(calculator.currentOperand).toBe('')
      expect(calculator.previousOperand).toBe('')
      expect(calculator.operation).toBeUndefined()
    })
  })

  describe('clear()', () => {
    it('devrait réinitialiser tous les opérandes', () => {
      calculator.currentOperand = '123'
      calculator.previousOperand = '456'
      calculator.operation = '+'
      
      calculator.clear()
      
      expect(calculator.currentOperand).toBe('')
      expect(calculator.previousOperand).toBe('')
      expect(calculator.operation).toBeUndefined()
    })
  })

  describe('appendNumber()', () => {
    it('devrait ajouter un nombre à l\'opérande courant', () => {
      calculator.appendNumber('5')
      expect(calculator.currentOperand).toBe('5')
      
      calculator.appendNumber('3')
      expect(calculator.currentOperand).toBe('53')
    })

    it('devrait ajouter un point décimal', () => {
      calculator.appendNumber('5')
      calculator.appendNumber('.')
      calculator.appendNumber('2')
      expect(calculator.currentOperand).toBe('5.2')
    })

    it('ne devrait pas ajouter plusieurs points décimaux', () => {
      calculator.appendNumber('5')
      calculator.appendNumber('.')
      calculator.appendNumber('2')
      calculator.appendNumber('.')
      expect(calculator.currentOperand).toBe('5.2')
    })
  })

  describe('delete()', () => {
    it('devrait supprimer le dernier caractère', () => {
      calculator.currentOperand = '123'
      calculator.delete()
      expect(calculator.currentOperand).toBe('12')
    })

    it('devrait gérer la suppression sur un opérande vide', () => {
      calculator.currentOperand = ''
      calculator.delete()
      expect(calculator.currentOperand).toBe('')
    })
  })

  describe('chooseOperation()', () => {
    it('devrait définir l\'opération et déplacer l\'opérande courant vers le précédent', () => {
      calculator.currentOperand = '10'
      calculator.chooseOperation('+')
      
      expect(calculator.operation).toBe('+')
      expect(calculator.previousOperand).toBe('10')
      expect(calculator.currentOperand).toBe('')
    })

    it('ne devrait pas définir d\'opération si l\'opérande courant est vide', () => {
      calculator.chooseOperation('+')
      expect(calculator.operation).toBeUndefined()
    })
  })

  describe('compute()', () => {
    beforeEach(() => {
      calculator.previousOperand = '10'
      calculator.currentOperand = '5'
    })

    it('devrait additionner correctement', () => {
      calculator.operation = '+'
      calculator.compute()
      expect(calculator.currentOperand).toBe(15)
    })

    it('devrait soustraire correctement', () => {
      calculator.operation = '-'
      calculator.compute()
      expect(calculator.currentOperand).toBe(5)
    })

    it('devrait multiplier correctement', () => {
      calculator.operation = '×'
      calculator.compute()
      expect(calculator.currentOperand).toBe(50)
    })

    it('devrait diviser correctement', () => {
      calculator.operation = '÷'
      calculator.compute()
      expect(calculator.currentOperand).toBe(2)
    })

    it('ne devrait pas diviser par zéro', () => {
      calculator.currentOperand = '0'
      calculator.operation = '÷'
      
      // Mock de alert pour éviter l'affichage dans les tests
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
      
      calculator.compute()
      
      expect(alertSpy).toHaveBeenCalledWith('Division par zéro impossible!')
      expect(calculator.currentOperand).toBe('0')
      
      alertSpy.mockRestore()
    })

    it('ne devrait pas calculer avec des opérandes invalides', () => {
      calculator.previousOperand = 'abc'
      calculator.currentOperand = '5'
      calculator.operation = '+'
      
      const initialCurrent = calculator.currentOperand
      calculator.compute()
      
      expect(calculator.currentOperand).toBe(initialCurrent)
    })
  })

  describe('sqrt()', () => {
    it('devrait calculer la racine carrée correctement', () => {
      calculator.currentOperand = '9'
      calculator.sqrt()
      expect(calculator.currentOperand).toBe(3)
    })

    it('devrait calculer la racine carrée de 0', () => {
      calculator.currentOperand = '0'
      calculator.sqrt()
      expect(calculator.currentOperand).toBe(0)
    })

    it('ne devrait pas calculer la racine carrée d\'un nombre négatif', () => {
      calculator.currentOperand = '-4'
      
      // Mock de alert
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
      
      calculator.sqrt()
      
      expect(alertSpy).toHaveBeenCalledWith('Racine carrée de nombre négatif impossible!')
      expect(calculator.currentOperand).toBe('-4')
      
      alertSpy.mockRestore()
    })
  })

  describe('getDisplayNumber()', () => {
    it('devrait formater les nombres entiers', () => {
      const result = calculator.getDisplayNumber(1234)
      expect(result).toBe('1 234')
    })

    it('devrait formater les nombres décimaux', () => {
      const result = calculator.getDisplayNumber(1234.56)
      expect(result).toBe('1 234.56')
    })

    it('devrait gérer les nombres vides', () => {
      const result = calculator.getDisplayNumber('')
      expect(result).toBe('')
    })
  })

  describe('updateDisplay()', () => {
    it('devrait mettre à jour l\'affichage de l\'opérande courant', () => {
      calculator.currentOperand = '123'
      calculator.updateDisplay()
      expect(currentElement.innerText).toBe('123')
    })

    it('devrait afficher 0 pour un opérande vide', () => {
      calculator.currentOperand = ''
      calculator.updateDisplay()
      expect(currentElement.innerText).toBe('0')
    })

    it('devrait afficher l\'opération en cours', () => {
      calculator.previousOperand = '10'
      calculator.operation = '+'
      calculator.updateDisplay()
      expect(previousElement.innerText).toBe('10 +')
    })
  })
})