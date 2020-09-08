import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user : {},
    error: null
  },
  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, data){
      state.status = 'success'
      state.token = data.token
      state.user = data.user
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
    },
    setError(state, error){
      state.error = error
    },
    clearError(state){
      state.error = null
    }
  },
  actions: {
    login({commit}, {vm, user}){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: '/user/login', data: user, method: 'POST' })
          .then(resp => {
            const userData = {
              token: resp.data.token,
              user: resp.data.user
            }
            localStorage.setItem('token', userData.token)
            axios.defaults.headers.common['Authorization'] = userData.token
            commit('auth_success', userData)
            resolve(resp)
          })
          .catch(err => {
            commit('clearError')
            commit('setError', err.response.data.message)
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    register({commit}, {vm, user}){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: '/user/registration', data: user, method: 'POST' })
          .then(resp => {
            const userData = {
              token: resp.data.token,
              user: resp.data.user
            }
            localStorage.setItem('token', userData.token)
            axios.defaults.headers.common['Authorization'] = userData.token
            commit('auth_success', userData)
            resolve(resp)
          })
          .catch(err => {
            commit('clearError')
            commit('setError', err.response.data.message)
            commit('auth_error', err)
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    logout({commit}){
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    fullName: state => {
      return state.user.firstName + ' ' + state.user.secondName
    },
    userRole: state => state.user.role,
    error: state => state.error,
    userId: state => state.user.id
  },
  plugins: [createPersistedState()]
})

export default store;