import Vuex from 'vuex'
import getters from './getters'

import permission from './modules/permission'
import app from './modules/app'
import user from './modules/user'

const store = new Vuex.Store({
  modules: {
    app,
    user,
    permission
  },
  getters
})

export default store
