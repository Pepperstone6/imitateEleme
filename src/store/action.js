import axios from 'axios'
import * as types from './mutation-type.js'
import { createPosition } from '@/common/public.js'

export const getPosition =  function({ commit }, position) {
    commit(types.GET_POSITION, position)
}
export const addPositionInfo = function ({ commit }, positionInfo) {
    commit(types.ADD_POSITION, positionInfo)
}
export const setKeyWord = function ({ commit }, keyword) {
    commit(types.SET_KEYWORD, keyword)
}