import operation from './operation'

const install = function(Vue) {
  Vue.directive('operation', operation)
}

if (window.Vue) {
  window['operation'] = operation
  Vue.use(install); // eslint-disable-line
}

operation.install = install
export default operation
