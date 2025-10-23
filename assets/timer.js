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
  /** @type {{1: {hours: number, minutes: number, seconds: number}, 2: {hours: number, minutes: number, seconds: number}, 3: {hours: number, minutes: number, seconds: number}, 4: {hours: number, minutes: number, seconds: number}}} */
  #duration = {
    1: { hours: 0, minutes: 0, seconds: 0 },
    2: { hours: 0, minutes: 0, seconds: 0 },
    3: { hours: 0, minutes: 0, seconds: 0 },
    4: { hours: 0, minutes: 0, seconds: 0 },
  }
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

  get duration () {
    return this.#duration[this.#quarter]
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
    Object.assign(this.duration, { hours: 0, minutes: 0, seconds: 0 })
    this.#displayTimerElement.innerText = FORMATTER(this.duration)
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
   * @param {('add'|'substract')} operation
   */
  #updateTimer (operation = 'add') {
    if (operation === 'substract' && this.duration.seconds === 0) {
      return
    }

    operation === 'add' ? ++this.duration.seconds : --this.duration.seconds

    if (this.duration.seconds > 59) {
      this.duration.minutes++
      this.duration.seconds = 0
    }
    if (this.duration.minutes > 59) {
      this.duration.hours++
      this.duration.minutes = 0
    }
    this.#updateDisplayTimer()
  }

  #updateDisplayTimer = () => this.#displayTimerElement.innerText = FORMATTER(this.duration)

  /**
   * Add time to the timer
   * @param {string} operation
   */
  #addTimes ({ target: { dataset: { operation = 'add' }} }) {
    this.#updateTimer(operation)
  }
}
