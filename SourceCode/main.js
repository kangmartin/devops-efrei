import './style.css'
import { Calculator } from './calculator.js'

// Initialize calculator
const calculator = new Calculator(
  document.getElementById('previous-operand'),
  document.getElementById('current-operand')
)

// Add event listeners to buttons
document.querySelectorAll('[data-number]').forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
    addClickEffect(button)
  })
})

document.querySelectorAll('[data-operator]').forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
    addClickEffect(button)
  })
})

document.querySelector('[data-equals]').addEventListener('click', () => {
  calculator.compute()
  calculator.updateDisplay()
  addClickEffect(document.querySelector('[data-equals]'))
})

document.querySelector('[data-clear]').addEventListener('click', () => {
  calculator.clear()
  calculator.updateDisplay()
  addClickEffect(document.querySelector('[data-clear]'))
})

document.querySelector('[data-delete]').addEventListener('click', () => {
  calculator.delete()
  calculator.updateDisplay()
  addClickEffect(document.querySelector('[data-delete]'))
})

document.querySelector('[data-sqrt]').addEventListener('click', () => {
  calculator.sqrt()
  calculator.updateDisplay()
  addClickEffect(document.querySelector('[data-sqrt]'))
})

// Add keyboard support
document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9' || e.key === '.') {
    calculator.appendNumber(e.key)
    calculator.updateDisplay()
  }
  
  if (e.key === '+' || e.key === '-') {
    calculator.chooseOperation(e.key)
    calculator.updateDisplay()
  }
  
  if (e.key === '*') {
    calculator.chooseOperation('×')
    calculator.updateDisplay()
  }
  
  if (e.key === '/') {
    e.preventDefault()
    calculator.chooseOperation('÷')
    calculator.updateDisplay()
  }
  
  if (e.key === 'Enter' || e.key === '=') {
    calculator.compute()
    calculator.updateDisplay()
  }
  
  if (e.key === 'Escape') {
    calculator.clear()
    calculator.updateDisplay()
  }
  
  if (e.key === 'Backspace') {
    calculator.delete()
    calculator.updateDisplay()
  }
})

// Add visual feedback for button clicks
function addClickEffect(button) {
  button.classList.add('clicked')
  setTimeout(() => {
    button.classList.remove('clicked')
  }, 150)
}

// Initialize display
calculator.updateDisplay()