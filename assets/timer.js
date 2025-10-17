const FORMATTER = (duration) => new Intl.DurationFormat('fr', { style: 'digital' }).format(duration)

export class Timer {
  /** @type {Element} */
  #element
  /** @type {Element} */
  #toggleTimerElement
  /** @type {Element} */
  #displayTimerElement
  /** @type {{hours: number, minutes: number, seconds: number}} */
  #duration = { hours: 0, minutes: 0, seconds: 0 }
  /** @type {number} */
  #intervalId = 0

  /**
   * @param {Element} element
   */
  constructor (element) {
    this.#element = element
    this.#element.id = `cell-${window.crypto.randomUUID()}`
    this.#setElements()
    this.#setEvents()
  }

  #setElements () {
    this.#toggleTimerElement = this.#element.querySelector('.js-playeronfield')
    this.#displayTimerElement = this.#element.querySelector('.js-timer')
  }

  #setEvents () {
    this.#toggleTimerElement.addEventListener('change', this.#toggle.bind(this))
  }

  #toggle () {
    if (window.is_timer_launched === false) {
      return
    }
    this.launch()
  }

  launch () {
    clearInterval(this.#intervalId)
    if (this.#toggleTimerElement.checked === false) {
      return
    }
    this.#intervalId = setInterval(this.#updateTimer.bind(this), 1000)
  }

  pause () {
    clearInterval(this.#intervalId)
  }

  #updateTimer () {
    this.#duration.seconds++
    if (this.#duration.seconds > 59) {
      this.#duration.minutes++
      this.#duration.seconds = 0
    }
    if (this.#duration.minutes > 59) {
      this.#duration.hours++
      this.#duration.minutes = 0
    }
    this.#displayTimerElement.innerText = FORMATTER(this.#duration)
  }
}
