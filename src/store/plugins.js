
import VuexPersistence from 'vuex-persist'

export const vueLocal = new VuexPersistence({
  storge: window.localStorage,
  reducer: (state) => ({
    position : state.position
  })
})