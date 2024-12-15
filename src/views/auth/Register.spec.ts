import { mount, VueWrapper } from '@vue/test-utils'
import Vuex, { Store } from 'vuex'
import { createRouter, createWebHistory, Router } from 'vue-router'
import Register from '@/views/auth/Register.vue'
import { describe, it, beforeEach, vi, expect } from 'vitest'

interface State {
  auth: {
    loading: boolean;
    errors: Record<string, string>;
  };
}

describe('View Register', () => {
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
      'auth/login': vi.fn(),
      'auth/register': vi.fn() // Add the 'auth/register' action
    }
    store = new Vuex.Store({
      state,
      actions,
    })
    router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', component: { template: '<div></div>' } },
        { path: '/login', component: { template: '<div>Login</div>' } },
      ]
    })
  })

  it('renders correctly', () => {
    const wrapper: VueWrapper = mount(Register, {
      global: {
        plugins: [store, router]
      }
    })

    expect(wrapper.text()).toContain('Register')
  })

  it('dispatches auth/register action with correct payload on form submit', async () => {
    const wrapper: VueWrapper = mount(Register, {
      global: {
        plugins: [store, router]
      }
    })

    await wrapper.find('#name').setValue('John Doe')
    await wrapper.find('#email').setValue('johndoe@example.com')
    await wrapper.find('#password').setValue('password')
    await wrapper.find('#password_confirmation').setValue('password')

    await wrapper.find('form').trigger('submit.prevent');

    expect(actions['auth/register']).toHaveBeenCalledWith(expect.any(Object), { name: 'John Doe', email: 'johndoe@example.com', password: 'password', password_confirmation: 'password' })
  });
})
