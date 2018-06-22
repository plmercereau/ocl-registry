import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'
// import axios from '../plugins/axios.js'

const listParams = {
  limit: 0
}

const createStore = () => {
  return new Vuex.Store({
    state: {
      menuIsActive: false,
      org: {},
      orgs: []
    },
    // plugins: [createPersistedState()],
    mutations: {
      toggleMenuState (state) {
        state.menuIsActive = !state.menuIsActive
      },
      setOrgs: (state, orgs) => {
        state.orgs = orgs
      },
      setCurrentOrg: (state, org) => {
        state.org = org
      }
    },
    actions: {
      async getOrgs ({commit}) {
        let {data} = await this.$axios.get(`/api/orgs`, {params: listParams})
        commit('setOrgs', data)
      },
      // async getPost ({commit, store}, id) {
      //   let {data} = await axios.get(`posts/${id}`)
      //   commit('setCurrentPost', data)
      // },
      async nuxtServerInit ({commit}, {app, store, isClient, isServer, route, params}) {
        if (isServer && route.name === 'orgsView') {
          let {data} = await app.$axios.get('/api/orgs', {params: listParams})
          commit('setOrgs', data)
        }
        if (isServer && params.id) {
          let {data} = await app.$axios.get(`/api/orgs/${params.id}`)
          commit('setCurrentOrg', data)
        }
      }
    }
  })
}

export default createStore
