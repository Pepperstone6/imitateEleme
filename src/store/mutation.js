import * as types from './mutation-type'
const mutations = {
  [types.GET_POSITION] (state, position) {
    state.position = position
  }
}