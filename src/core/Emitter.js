export class Emitter {
  constructor() {
    this.listeners = {}
  }
  // Notificaton listener if has
  // 'formula:done'
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false
    }
    this.listeners[event].forEach(listener => {
      listener(...args)
    })
    return true
  }

  // subscribe on notif
  // formula.subscribe('table:select', ()=>{})
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
    return () => {
      this.listeners[event] =
          this.listeners[event].filter(listener => listener !== fn)
    }
  }
}

const emitter = new Emitter()

emitter.subscribe('qwerty', data => console.log('s', data))

emitter.emit('qwerty', 42)
