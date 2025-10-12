const TEMPLATE = document.querySelector('#template')
const ITEMS = 10
let ITERATOR = 0
const FORMATTER = (duration) => new Intl.DurationFormat('fr', { style: 'digital' }).format(duration)

for (ITERATOR; ITERATOR < ITEMS; ITERATOR++) {
  const TEMPLATE_CONTENT = TEMPLATE.content.cloneNode(true)
  document.body.appendChild(TEMPLATE_CONTENT)
  init(document.querySelectorAll('.js-cell')[ITERATOR])
}

/**
 * Init timer
 * @param {Object} cell - wrapping element
 */

function init (cell) {
  // timer storage
  const duration = {
    hours: 0,
    minutes: 0,
    seconds: 0
  }
  let interval

  // elements
  const startButton = cell.querySelector('.js-button-start')
  const pauseButton = cell.querySelector('.js-button-pause')
  const resetButton = cell.querySelector('.js-button-reset')
  const timerElement = cell.querySelector('.js-timer')

  // attach events
  startButton.addEventListener('click', () => {
    clearInterval(interval)
    interval = setInterval(startTimer, 1000)
    function startTimer () {
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

  pauseButton.addEventListener('click', () => {
    clearInterval(interval)
  })

  resetButton.addEventListener('click', () => {
    clearInterval(interval)
    duration.hours = duration.minutes = duration.seconds = 0
    timerElement.innerText = FORMATTER(duration)
  })
}
