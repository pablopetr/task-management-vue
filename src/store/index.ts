import { createStore } from 'vuex'
import { authModule } from '@/store/module/authModule.ts'
import { taskModule } from '@/store/module/taskModule.ts'

const store = createStore({
  modules: {
    auth: authModule,
    tasks: taskModule // Ensure the namespace matches the dispatch call
  }
})

export default store
