import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || ''
    this.emitter = options.emitter
    this.subscribe = options.subscribe || []
    this.store = options.store
    this.unsubscribers = []

    this.prepare()
  }

  // Configuring our component before init
  prepare() {}

  // Return components template
  toHTML() {
    return ''
  }

  // Notify listen about events
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  // Subscribe to the event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  // Initializing component
  // Add DOM listener
  init() {
    this.initDomListeners()
  }

  isWatching(key) {
    return this.subscribe.includes(key)
  }

  // Remove component
  // Clean up the listener
  destroy() {
    this.removeDomListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
