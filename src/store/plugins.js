
import VuexPersistence from 'vuex-persist'

export const vueLocal = new VuexPersistence({
  storge: window.localStorage,
  reducer: (state) => ({
    keyword: state.keyword,
    position : state.position
  })
})