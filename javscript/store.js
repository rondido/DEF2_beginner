export class Store {
  constructor(state) {
    this.state = {}
    this.observers = {}
    for (const key in state) {
      Object.defineProperty(this.state, key, {
        get: () => {
          return state[key]
        },
        set: value => {
          state[key] = value
          this.observers[key].forEach(cb => cb(value))
        }
      })
    }
  }
  subscribe(key, callback) {
    Array.isArray(this.observers[key])
      ? this.observers[key].push(callback)
      : (this.observers[key] = [callback])
  }
}
