const MAINELEMENT = document.querySelector('.js-main')
const TEMPLATE = document.querySelector('#template')
const LAUNCHBUTTON = document.querySelector('.js-launch-timer')
const FORMATTER = (duration) => new Intl.DurationFormat('fr', { style: 'digital' }).format(duration)
let IS_TIMER_LAUNCHED = false

/**
 * Create DOM
 */

Array.from({ length: 10 }).forEach(() => {
  const content = TEMPLATE.content.cloneNode(true)
  MAINELEMENT.appendChild(content)
})

const CELLSELEMENTS = document.querySelectorAll('.js-cell')
CELLSELEMENTS.forEach(init)
/**
 * Init timer
 * @param {Object} cell - wrapping element
 */

function init (cell) {
  const duration = { hours: 0, minutes: 0, seconds: 0 }
  let intervalId

  const toggleTimerElement = cell.querySelector('.js-playeronfield')
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
    if (IS_TIMER_LAUNCHED === false) {
      return
    }
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

/**
 * Launch timers for players that are in the field
 */

LAUNCHBUTTON.addEventListener('click', () => {
  IS_TIMER_LAUNCHED = true
  CELLSELEMENTS.forEach((cell) => {
    let intervalId
    const duration = { hours: 0, minutes: 0, seconds: 0 }
    const timerElement = cell.querySelector('.js-timer')
    const isPlayerOnField = cell.querySelector('.js-playeronfield').checked

    if (isPlayerOnField === false) {
      return
    }

    intervalId = setInterval(updateTimer, 1000)

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
  })
})
