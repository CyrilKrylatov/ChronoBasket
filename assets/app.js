const TEMPLATE = document.querySelector('#template')
const ITEMS = 10
const FORMATTER = (duration) => new Intl.DurationFormat('fr', { style: 'digital' }).format(duration)
const MAINELEMENT = document.querySelector('.js-main')

/**
 * Create DOM
 */

Array.from({ length: ITEMS }).forEach(() => {
  const content = TEMPLATE.content.cloneNode(true)
  MAINELEMENT.appendChild(content)
})

document.querySelectorAll('.js-cell').forEach(init)

/**
 * Init timer
 * @param {Object} cell - wrapping element
 */

function init (cell) {
  const duration = { hours: 0, minutes: 0, seconds: 0 }
  let intervalId

  const toggleTimerElement = cell.querySelector('.js-toggle-timer')
  const resetButton = cell.querySelector('.js-button-reset')
  const timerElement = cell.querySelector('.js-timer')

  function updateTimer () {
    duration.seconds++
    if (duration.seconds > 59) {
      duration.minutes++
      duration.seconds = 0
    }
    if (duration.minutes > 59) {
      duration.hours++
      duration.minutes = 0
    }
    timerElement.innerText = FORMATTER(duration)
  }

  function toggle ({ target: { checked } }) {
    clearInterval(intervalId)
    if (checked === true) {
      intervalId = setInterval(updateTimer, 1000)
    }
  }

  function reset () {
    clearInterval(intervalId)
    Object.assign(duration, { hours: 0, minutes: 0, seconds: 0 })
    timerElement.textContent = FORMATTER(duration)
    toggleTimerElement.checked = false
  }

  toggleTimerElement.addEventListener('change', toggle)
  resetButton.addEventListener('click', reset)
}
