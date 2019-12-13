import store from '@/store'

export default {
  inserted(el, binding, vnode) {
    const { value } = binding
    const operations = store.getters && store.getters.operationList
    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value

      const hasPermission = operations.some(role => {
        return permissionRoles.includes(role)
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need roles! Like v-permission="['admin','editor']"`)
    }
  }
}
