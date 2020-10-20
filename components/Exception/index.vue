<template>
  <div class="exception">
    <div class="imgBlock">
      <transition name="fade">
        <div v-show="show" class="imgEle" :style="{backgroundImage: `url(${config[type].img})`}" />
      </transition>
    </div>
    <div class="content">
      <transition name="turn-up">
        <h1 v-show="show">{{ config[type].title }}</h1>
      </transition>
      <transition name="turn-up-delay-400">
        <div v-show="show" class="desc">{{ config[type].desc }}</div>
      </transition>
      <transition name="turn-up-delay-600">
        <div v-show="show" class="actions">
          <slot name="action-slot">
            <van-button plain size="small" type="info" @click="handleToHome">
              返回首页
            </van-button>
            <!-- <van-button plain size="small" type="warning" @click="handleToLogin">
              退出登录
            </van-button> -->
          </slot>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import types from './type'
export default {
  name: 'Exception',
  props: {
    type: {
      type: String,
      default: '404'
    }
  },
  data () {
    return {
      config: types,
      show: false
    }
  },
  mounted () {
    this.show = true
  },
  methods: {
    handleToHome () {
      this.$router.push({ path: '/' })
    },
    handleToLogin () {
      this.$store.dispatch({ type: 'INIT_USER_STORE' })
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style lang="stylus" scoped>
.exception
  display flex
  display -webkit-flex
  align-items center
  justify-content center
  padding 10% 20%
  min-height 500px

  .imgBlock
    flex 1

  .imgEle
    width 100%
    max-width 430px
    height 360px
    background-repeat no-repeat
    background-position 50% 50%
    background-size contain

  .content
    flex 1

    h1
      margin-bottom 24px
      color #434e59
      font-weight 600
      font-size 72px
      line-height 72px

    .desc
      margin-bottom 16px
      color #434e59
      font-size 20px
      line-height 28px

    .actions
      button:not(:last-child)
        margin-right 8px

@media screen and (max-width: 768px) {
  .exception {
    padding 10% 0
  }
}

.fade-enter-active, .fade-leave-active
  transition 1.2s opacity .1s
.fade-enter, .fade-leave-to
  opacity 0

.turn-up-enter-active, .turn-up-leave-active
  transition .5s all ease .2s
.turn-up-enter, .turn-up-leave-to
  transform translateY(20px)
  opacity 0

.turn-up-delay-400-enter-active, .turn-up-delay-400-leave-active
  transition .5s all ease .4s
.turn-up-delay-400-enter, .turn-up-delay-400-leave-to
  transform translateY(20px)
  opacity 0

.turn-up-delay-600-enter-active, .turn-up-delay-600-leave-active
  transition .5s all ease .6s
.turn-up-delay-600-enter, .turn-up-delay-600-leave-to
  transform translateY(20px)
  opacity 0
</style>
