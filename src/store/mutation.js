import * as types from './mutation-type.js'
const mutations = {
  [types.GET_POSITION] (state, position) {
    state.position = position
  },
  [types.ADD_POSITION] (state, positionInfo) {
    Object.defineProperty(state.position, positionInfo.key, {
      configurable: true,
      enumerable: true,
      value: positionInfo.val
    })
  }
}
export default mutations