const TEMPLATE = document.querySelector('#template')
const ITEMS = 10
const FORMATTER = (duration) => new Intl.DurationFormat('fr', { style: 'digital' }).format(duration)

Array.from({ length: ITEMS }).forEach(() => {
  const content = TEMPLATE.content.cloneNode(true)
  document.body.appendChild(content)
})

document.querySelectorAll('.js-cell').forEach(init)

/**
 * Init timer
 * @param {Object} cell - wrapping element
 */

function init (cell) {
  const duration = { hours: 0, minutes: 0, seconds: 0 }
  let intervalId

  const startButton = cell.querySelector('.js-button-start')
  const pauseButton = cell.querySelector('.js-button-pause')
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

  function start () {
    clearInterval(intervalId)
    intervalId = setInterval(updateTimer, 1000)
  }

  const pause = () => clearInterval(intervalId)

  function reset () {
    clearInterval(intervalId)
    Object.assign(duration, { hours: 0, minutes: 0, seconds: 0 })
    timerElement.textContent = FORMATTER(duration)
  }

  startButton.addEventListener('click', start)
  pauseButton.addEventListener('click', pause)
  resetButton.addEventListener('click', reset)
}
