export default function install (Vue) {
  if (install.installed) return
  install.installed = true

  Object.defineProperty(Vue.prototype, '$services', {
    get () { return this.$root._services }
  })

  Vue.mixin({
    beforeCreate () {
      if (this.$options.services) {
        this._services = this.$options.services
      }
    }
  })
}
