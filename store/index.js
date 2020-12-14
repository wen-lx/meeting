export const state = () => ({
  indexVal: 0
})

export const mutations = {
  add(state) {
    state.indexVal++
  }
}