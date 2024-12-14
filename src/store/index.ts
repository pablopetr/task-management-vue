import { createStore } from 'vuex'
import axios from 'axios'

const API_URL = 'http://localhost/api'

const authModule = {
  namespaced: true,
  state: {
    token: localStorage.getItem('jwt'),
    user: null,
    loading: false,
    error: null,
  },
  getters: {
    isAuthenticated(state, any) {
      return !!state.token;
    },
    getUser(state, any) {
      return state.user;
    },
    getError(state) {
      return state.error;
    },
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem('jwt', token);
    },
    REMOVE_TOKEN(state) {
      state.token = null;
      localStorage.removeItem('jwt');
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    }
  },
  actions: {
    async login(
      { commit },
      { email, password }: LoginPayload,
    ) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);

      try {
        const response = await axios.post(`${API_URL}/login`, { email, password});

        commit('SET_TOKEN', response.data.token);
        commit('SET_USER', null);

        return response.data;
      } catch(error: unknown) {
        commit('SET_ERROR', error.response?.data?.message || 'Login failed')

        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async logout({ commit }) {
      commit('REMOVE_TOKEN');
      commit('SET_USER', null);
    },

    async fetchUser({ commit, state }) {
      if(!state.token) return null;

      commit('SET_LOADING', true);
      commit('SET_ERROR', null);

      try {
        const response = await axios.get(`${API_URL}/me`, {
          headers: {
            Authorization: `Bearer ${state.token}`
          },
        });

        commit('SET_USER', response.data.data);

        return response.data;
      } catch(error: any) {
        commit('SET_ERROR', error.response?.data?.message || 'Failed to fetch user');

        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    }
  },
}

const store = createStore({
  modules: {
    auth: authModule
  }
})

export default store
