import axios from 'axios'
import * as types from './mutation-type'
import { createPosition } from '@/common/public.js'

export const getPosition =  function({ commit }, params) {
  createPosition().then(position => {
    commit(types.GET_POSITION, params)
  })
}