import { getToken, setToken, removeToken } from '@/utils/auth'
// import { login, getAdminInfo } from '@/api/admin'
// import _md5 from 'md5'
// import { Message } from 'element-ui'

const user = {
  namespaced: true,
  state: {
    token: getToken(),
    name: '',
    adminType: '',
    avatar: '',
    userId: '',
    roles: [], // 页面权限
    authList: [], // 用户类型权限
    operationList: [], // 操作权限列表,对页面中对某些操作，于用户类型权限结合使用
    ststem: {
      title: '地质调查院安全管理系统',
      logo: 'http://ps5e4ku46.bkt.clouddn.com/wmfxlogo-big.png'
    }
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    // 页面模块的权限,code为页面代码
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_AdminType: (state, adminType) => {
      state.adminType = adminType
    },
    SET_SYSTEM: (state, ststem) => {
      state.ststem = ststem
    },
    SET_USERID: (state, userId) => {
      state.userId = userId
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const phone = userInfo.phone.trim()
      return new Promise((resolve, reject) => {
        if (phone == 'admin' || phone == '123456') {
          const res = 'res'
          setToken('res')
          commit('SET_TOKEN', res)
          resolve(res)
        } else {
          reject('用户不存在')
        }
        // login({ phone, password: _md5(_md5(userInfo.password) + 'flynn') }).then(res => {
        //   setToken(res)
        //   commit('SET_TOKEN', res)
        //   resolve(res)
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 获取用户信息
    GetInfo({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        // getAdminInfo().then(res => {
        //   const msg = res.errmsg
        //   if (res.code != 200) {
        //     dispatch('FedLogOut').then(() => {
        //       Message({ message: msg, type: 'error', duration: 5 * 1000 })
        //       // setTimeout(() => {
        //       //   location.reload()
        //       // }, 2000)
        //     })
        //   }
        //   res = res.data
        //   commit('SET_NAME', res.nickName)
        //   resolve(JSON.parse(res.roleInfo.roleList))
        // }).catch(() => {
        //   console.log(132)
        //   dispatch('FedLogOut').then(() => {
        //     Message({ message: '获取用户信息失败', type: 'error', duration: 5 * 1000 })
        //     // setTimeout(() => {
        //     //   location.reload()
        //     // }, 2000)
        //   })
        // })
        commit('SET_NAME', '超级管理员')
        resolve(['all'])
      })
    },

    // 登出
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_AuthList', [])
        removeToken()
        resolve()
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
