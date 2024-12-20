import axios from 'axios'

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export const authModule = {
  namespaced: true,
  state: {
    token: localStorage.getItem('jwt'),
    user: localStorage.getItem('user'),
    loading: false,
    error: null,
    errors: null,
  },
  getters: {
    isAuthenticated(state: any) {
      return !!state.token;
    },
    getUser(state: any) {
      return state.user;
    },
    getError(state: any) {
      return state.error;
    },
  },
  mutations: {
    SET_TOKEN(state: any, token: string) {
      state.token = token;
      localStorage.setItem('jwt', token);
    },
    REMOVE_TOKEN(state: any) {
      state.token = null;
      localStorage.removeItem('jwt');
    },
    SET_USER(state: any, user: any) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    SET_LOADING(state: any, loading: boolean) {
      state.loading = loading;
    },
    SET_ERROR(state: any, error: string) {
      state.error = error;
    },
    SET_ERRORS(state: any, errors: any) {
      state.errors = errors;
    },
  },
  actions: {
    async register({ commit }: any, { name, email, password, password_confirmation }: RegisterPayload) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);

      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/register`, { name, email, password, password_confirmation });
        return response;
      } catch (error: any) {
        if (error.response.data.errors) {
          commit('SET_ERRORS', error.response.data);
        }
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async login({ commit, dispatch }: any, { email, password }: LoginPayload) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);

      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, { email, password });
        commit('SET_TOKEN', response.data.token);

        // Fetch user after setting the token
        await dispatch('fetchUser');

        console.log(this.state.auth.token);

        return response;
      } catch (error: any) {
        commit('SET_ERROR', error.response?.data?.message || 'Login failed');
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async logout({ commit }: any) {
      commit('REMOVE_TOKEN');
      commit('SET_USER', null);
    },

    async fetchUser({ commit, state }: any) {
      if (!state.token) return null;

      commit('SET_LOADING', true);
      commit('SET_ERROR', null);

      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/me`, {
          headers: {
            Authorization: `Bearer ${state.token}`
          },
        });

        commit('SET_USER', response.data);

        return response.data;
      } catch (error: any) {
        if (error.response?.status === 401) {
          commit('REMOVE_TOKEN');
          commit('SET_USER', null);
        }
        commit('SET_ERROR', error.response?.data?.message || 'Failed to fetch user');
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    }
  },
}
