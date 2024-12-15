import { mount, VueWrapper } from '@vue/test-utils'
import Vuex, { Store } from 'vuex'
import { createRouter, createWebHistory, Router } from 'vue-router'
import Profile from '@/views/Profile.vue'
import { describe, it, beforeEach, vi, expect } from 'vitest'

interface State {
  auth: {
    user: { name: string; email: string } | null;
    loading: boolean;
    errors: Record<string, string>;
  };
}

describe('View Profile', () => {
  let store: Store<State>;
  let actions: { [key: string]: vi.Mock };
  let state: State;
  let router: Router;

  beforeEach(() => {
    state = {
      auth: {
        user: { name: 'John Doe', email: 'johndoe@example.com' },
        loading: false,
        errors: {}
      }
    }
    actions = {
      'auth/fetchUser': vi.fn()
    }
    store = new Vuex.Store({
      state,
      actions
    })
    router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', component: { template: '<div></div>' } },
        { path: '/register', component: { template: '<div>Register</div>' } }
      ]
    })
  })

  it('renders correctly', () => {
    const wrapper: VueWrapper = mount(Profile, {
      global: {
        plugins: [store, router]
      }
    })

    expect(wrapper.text()).toContain('User Profile')
  })

  it('dispatches auth/fetchUser action on component mount', () => {
    mount(Profile, {
      global: {
        plugins: [store, router]
      }
    })

    expect(actions['auth/fetchUser']).toHaveBeenCalled()
  })
})
