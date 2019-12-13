// 定义一些全局的变量
const getters = {
  // app的变量
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  // user的变量
  name: state => state.user.name,
  token: state => state.user.token,
  roles: state => state.user.roles,
  ststem: state => state.user.ststem,
  avatar: state => state.user.avatar,
  // permission的变量
  addRouters: state => state.permission.addRouters,
  routers: state => state.permission.routers

}
export default getters
