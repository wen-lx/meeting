<template>
  <div class="page-success">
    <van-sticky>
      <van-nav-bar title="会议报名成功" />
    </van-sticky>
    <van-empty
      class="custom-image"
      :image="require('./success.svg')"
      description="会议报名成功"
    />
    <van-button @click="copyLink()" class="btn-copy" type="info">复制邀请链接</van-button>
    <br/>
    <input ref="url" type="text" :value="url" class="input-box"/>
  </div>
</template>

<script>
export default {
  layout: 'default',
  data () {
    return { 
      url: ''
    }
  },
  mounted(){
    if (process.client) {
      this.url = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port
    }
  },
  methods: {
    copyLink () {
      const el = this.$refs.url
      el.select()
      document.execCommand('copy')
      this.$toast.success('复制成功')
    }
  }
}
</script>

<style>
.page-success{
  width: 100%;
}
.input-box{
  z-index: -10;
  opacity: 0;
}
</style>
