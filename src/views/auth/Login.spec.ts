import { mount, VueWrapper } from '@vue/test-utils'
import Vuex, { Store } from 'vuex'
import { createRouter, createWebHistory, Router } from 'vue-router'
import Login from '@/views/auth/Login.vue'
import { describe, it, beforeEach, vi, expect } from 'vitest'

interface State {
  auth: {
    loading: boolean;
    errors: Record<string, string>;
  };
}

describe('View Login', () => {
  let store: Store<State>;
  let actions: { [key: string]: vi.Mock };
  let state: State;
  let router: Router;

  beforeEach(() => {
    state = {
      auth: {
        loading: false,
        errors: {}
      }
    }
    actions = {
      'auth/login': vi.fn()
    }
    store = new Vuex.Store({
      state,
      actions
    })
    router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', component: Login },
        { path: '/register', component: { template: '<div>Register</div>' } }
      ]
    })
  })

  it('renders correctly', () => {
    const wrapper: VueWrapper = mount(Login, {
      global: {
        plugins: [store, router]
      }
    })

    expect(wrapper.text()).toContain('Login')
  })

  it('dispatches auth/login action with correct payload on form submit', async () => {
    const wrapper: VueWrapper = mount(Login, {
      global: {
        plugins: [store, router]
      }
    })

    await wrapper.find('#email').setValue('test@example.com')
    await wrapper.find('#password').setValue('password123')
    await wrapper.find('form').trigger('submit.prevent')

    expect(actions['auth/login']).toHaveBeenCalledWith(expect.any(Object), { email: 'test@example.com', password: 'password123' })
  })
});
