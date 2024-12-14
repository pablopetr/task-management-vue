import { createStore } from 'vuex'
import { authModule } from '@/store/module/authModule.ts'

const store = createStore({
  modules: {
    auth: authModule
  }
})

export default store
