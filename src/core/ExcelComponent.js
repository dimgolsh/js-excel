import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.unsubscribers = []
    this.prepare()
  }

  // Настраивает компонет до init
  prepare() {}

  toHTML() {
    return ''
  }
  // уведомляем слушателей про события
  $emit(event, ...args) {
    const unsub = this.emitter.emit(event, ...args)
    this.unsubscribers.push(unsub)
  }

  $on(event, fn) {
    this.emitter.subscribe(event, fn)
  }

  // инициализация
  init() {
    this.initDOMListeners()
  }

  // удаляем компонет, чистим слушателей
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
