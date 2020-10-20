<template>
  <div class="welcome_wrap">
    <!-- <Nuxt /> -->
    <div id="app">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="stylus">
.welcome_wrap
  margin 0 auto
  max-width 600px
  min-height 100vh
  display flex
  align-items center
  justify-content center
  #app
    font-family Avenir, Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    text-align center
    color #2c3e50
    margin 0 auto
    max-width 600px
    min-height 100vh
    background #F2F6FC
</style>
