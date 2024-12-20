import axios from 'axios';

export const taskModule = {
  namespaced: true,
  state: {
    tasks: [],
    task: null,
    loading: false,
    error: null,
    errors: null,
  },
  getters: {
    getTasks(state) {
      return state.tasks;
    },
    getTask(state) {
      return state.task;
    },
    getError(state) {
      return state.error;
    }
  },
  mutations: {
    SET_TASKS(state, tasks) {
      state.tasks = tasks;
    },
    SET_TASK(state, task) {
      state.task = task;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    SET_ERRORS(state, errors) {
      state.errors = errors;
    }
  },
  actions: {
    async index({ commit, rootState }) {
      commit('SET_LOADING', true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`, {
          headers: {
            Authorization: `Bearer ${rootState.auth.token}`,
          },
        });
        commit('SET_TASKS', response.data.data);
      } catch (error) {
        commit('SET_ERROR', error.response.data.message);
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async store({ commit, rootState }, payload) {
      commit('SET_LOADING', true);

      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/tasks`, payload, {
          headers: {
            Authorization: `Bearer ${rootState.auth.token}`,
          },
        });
        commit('SET_TASK', response.data.data);
      } catch (error) {
        commit('SET_ERROR', error.response.data.message);
        commit('SET_ERRORS', error.response.data.errors);
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async show({ commit, rootState }, id) {
      commit('SET_LOADING', true);

      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${rootState.auth.token}`,
          }
        });

        commit('SET_TASK', response.data);

      } catch (error) {
        commit('SET_ERROR', error.response.data.message);
      }
      finally {
        commit('SET_LOADING', false);
      }
    },

    async update({ commit, rootState }, payload) {
      commit('SET_LOADING', true);

      console.log(payload);

      try {
        const response = await axios.put(`${import.meta.env.VITE_API_URL}/tasks/${payload.id}`, payload, {
          headers: {
            Authorization: `Bearer ${rootState.auth.token}`,
          },
        });
        commit('SET_TASK', response.data.data);
      } catch (error) {
        console.log(error);

        commit('SET_ERROR', error.response.data.message);
        commit('SET_ERRORS', error.response.data.errors);
      } finally {
        commit('SET_LOADING', false);
      }
    },
  },
}
