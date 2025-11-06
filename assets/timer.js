const FORMATTER = (duration) => new Intl.DurationFormat('fr', { style: 'digital' }).format(duration)

export class Timer {
  /** @type {Element} */
  #element
  /** @type {Element} */
  #checkboxElement
  /** @type {Element} */
  #displayTimerElement
  /** @type {Element} */
  #resetElement
  /** @type {Element} */
  #nameElement
  /** @type {Element} */
  #addTimesElement
  /** @type {number[]} */
  #duration = [0, 0, 0, 0]
  /** @type {number} */
  #intervalId = 0
  /** @type {number} */
  #quarter = 1

  /**
   * @param {number} quarter
   */
  set quarter (quarter) {
    this.#quarter = quarter
  }

  /**
   * Decomposes a duration in seconds into hours, minutes, and seconds.
   * @returns {{hours: number, minutes: number, seconds: number}} The decomposed duration object.
   */

  get decomposeDuration () {
    const secondsInQuarter = this.#duration[this.#quarter]
    const hours = Math.floor(secondsInQuarter / 3600)
    const minutes = Math.floor((secondsInQuarter % 3600) / 60)
    const seconds = secondsInQuarter % 60
    return { hours, minutes, seconds }
  }

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
    this.#checkboxElement = this.#element.querySelector('.js-playeronfield')
    this.#displayTimerElement = this.#element.querySelector('.js-timer')
    this.#resetElement = this.#element.querySelector('.js-button-reset')
    this.#nameElement = this.#element.querySelector('.js-name')
    this.#addTimesElement = this.#element.querySelector('.js-addtimes')
  }

  #setEvents () {
    this.#checkboxElement.addEventListener('change', this.#toggle.bind(this))
    this.#resetElement.addEventListener('click', this.#reset.bind(this))
    this.#addTimesElement.addEventListener('click', this.#addTimes.bind(this))
  }

  #toggle () {
    if (window.is_timer_launched === false) {
      return
    }
    this.start()
  }

  #reset () {
    if (!window.confirm(`Remettre à 0 le temps de ${this.#nameElement.value} ?`)) {
      return
    }
    clearInterval(this.#intervalId)
    this.#duration[this.#quarter] = 0
    this.#displayTimerElement.innerText = FORMATTER(this.decomposeDuration)
    this.#checkboxElement.checked = false
  }

  start () {
    clearInterval(this.#intervalId)
    if (this.#checkboxElement.checked === false) {
      return
    }
    this.#intervalId = setInterval(this.#updateTimer.bind(this), 1000)
  }

  pause () {
    clearInterval(this.#intervalId)
  }

  updateFromQuarter () {
    this.#updateDisplayTimer()
    if (this.#checkboxElement.checked === false) {
      return
    }
    this.pause()
    this.#checkboxElement.checked = false
  }

  /**
   * Add or substract a second to the timer
   * @param {(-1|1)} increment
   */
  #updateTimer (increment = 1) {
    this.#duration[this.#quarter] = Math.max(0, this.#duration[this.#quarter] + increment)
    this.#updateDisplayTimer()
  }

  #updateDisplayTimer = () => this.#displayTimerElement.innerText = FORMATTER(this.decomposeDuration)

  /**
   * Add time to the timer
   * @param {string} increment
   */
  #addTimes ({ target: { dataset: { increment = '+1' }} }) {
    this.#updateTimer(Number(increment))
  }
}
