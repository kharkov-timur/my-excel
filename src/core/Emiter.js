export class Emitter {
  constructor() {
    this.listeners = {}
  }

  // Other name for method "dispatch, fire, trigger"
  // Notify listeners if any
  // How work this method "table.emit('table-select', {a: 1})"
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false
    }
    this.listeners[event].forEach(listenet => {
      listenet(...args)
    })
    return true
  }

  // Other name for method "on, listen"
  // Subscribe to the notification
  // Add new listener
  // How work this method "formula.subscribe('table-select', () => {})"
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
    return () => {
      this.listeners[event] =
        this.listeners[event].filter(listeners => listeners !== fn)
    }
  }
}
