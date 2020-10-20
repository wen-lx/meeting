<template>
  <div class="page-wrap">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img width="100%" :src="images[index]" />
      </van-swipe-item>
    </van-swipe>
    <h2>SEK 2020中国儿童科学教育高峰论坛</h2>
    <div style="margin: 0 1rem">
      <p>尊敬的嘉宾：</p>
      <p style="text-indent: 1rem">您好！</p>
      <p style="text-indent: 1rem">
        SEK2020高峰论坛以“让科学教育更科学——让科学教育燃起来”为主题，聚焦中国科学院儿童科普阵营、儿童科学教育展示、儿童科学教育场景设计与实现等领域，让科技界、教育界、企业界不同思想和声音在“碰撞”、“共享”、“激发”中“燃”起新的火焰，为中国儿童科学精神与科学态度养成指明新的方向。
      </p>
    </div>
    <h2>参会报名</h2>
    <h6>(内部使用)</h6>
    <van-form style="margin-top: 10px" @submit="onSubmit">
      <van-field
        required
        name="name"
        v-model="form.name"
        label="姓名"
        :rules="rules.name"
        placeholder="请输入姓名"
      />
      <van-field
        required
        type="number"
        name="phone"
        v-model="form.phone"
        label="手机号"
        :rules="rules.phone"
        placeholder="请输入手机号"
      >
        <template #button>
          <van-button @click="getCode" :disabled="!(form.phone && isEmailValid)" native-type="button"
            :loading-text="`${delaySeconds}秒后可重新获取`" :loading="isSending" size="small" type="primary">
            发送验证码
          </van-button>
        </template>
      </van-field>
      <van-field
        required
        name="captcha"
        v-model="form.captcha"
        label="短信验证码"
        :rules="rules.captcha"
        placeholder="请输入验证码"
      />
      <van-field
        name="email"
        v-model="form.email"
        label="邮箱"
        :rules="rules.email"
        placeholder="请输入邮箱"
      />
      <van-field
        readonly
        required
        name="company"
        v-model="form.company"
        label="单位"
        placeholder="点击选择单位"
        :rules="rules.company"
        @click="checkNumberLimit"
      />
      <van-field
        required
        name="otherCompany"
        v-if="form.company === '其他'"
        v-model="form.otherCompany"
        label="来宾单位"
        placeholder="请输入来宾单位"
        :rules="rules.otherCompany"
      />
      <van-field
        name="organization"
        v-model="form.organization"
        label="部门"
        :rules="rules.organization"
        placeholder="请输入部门"
      />
      <van-field
        name="job"
        v-model="form.job"
        label="职务"
        :rules="rules.job"
        placeholder="请输入职务"
      />
      <van-field
        required
        name="idCard"
        v-model="form.idCard"
        label="身份证"
        :rules="rules.idCard"
        placeholder="请输入身份证"
      />
      <van-field name="memberImage" label="头像" :rules="rules.memberImage">
        <template #input>
          <van-uploader v-model="memberImageList" :max-count="1"/>
        </template>
      </van-field>
      <div class="info_wrap">
        <p>
          <i class="fa fa-info-circle" aria-hidden="true"></i>提示：
        </p>
        <p>本次会议使用刷脸签到，上传照片要求：</p>
        <p>- 近期肩部以上清晰、平视、正脸、无妆容、无遮挡头像照片</p>
        <p>- 500x500像素以上，5MB以内,支持*.jpg、*.jpeg或*.png格式</p>
        <p>若您不上传照片，请携带身份证进行签到。</p>
        <p>每个手机号只能注册一次。</p>
      </div>
      <div style="margin: 16px" id="div-box">
        <van-button round block type="info" native-type="submit" id="button-box"
          :loading="isSubmitting" loading-text="会议报名中...">
          报名
        </van-button>
      </div>
    </van-form>
    <p class="mini-desc">本会议签到系统由中科视拓 (北京) 科技有限公司赞助</p>
    <p class="mini-desc">邮箱：<a href="mailto:sheng.shan@seetatech.com">sheng.shan@seetatech.com</a>，电话：<a href="tel:010-82194993">010-82194993</a></p>
    <hr />
    <div class="info_wrap">
      <h3 style="text-align: left">其他事宜，请联络：</h3>
      <p>活动事宜：<a href="tel:62582343">62582343</a>，<a href="tel:62619141">62619141</a></p>
      <p>报名咨询：<a href="tel:62582343">62582343</a>，<a href="tel:62582351">62582351</a></p>
      <p>媒体合作：<a href="tel:62619141">62619141</a></p>
    </div>

    <!-- 选择框 -->
    <van-popup v-model="isShowCompanyPicker" round position="bottom">
      <van-picker
        show-toolbar
        :columns="langOptions"
        @confirm="changeCompany"
        @cancel="isShowCompanyPicker = false"
      />
    </van-popup>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Option, UploadFile, Form, Rules } from '../interface/common'
import {
  nameLengthValidator, stringLengthValidator, emailFormatValidator, phoneFormatValidator, idCardFormatValidator
} from '../utils/validator'
import { getCaptcha, memberRegister, memberCount } from '../api/api'

@Component
export default class Home extends Vue {
  private images: Array<string> = [
    require('@/assets/1.png')
  ]
asyncData () {
  console.log(22222)
}
  private form: Form = {
    name: '',
    phone: '',
    captcha: '',
    email: '',
    company: '',
    otherCompany: '',
    organization: '',
    job: '',
    idCard: ''
  }

  private formMap: Record<string, string> = {
    name: '姓名',
    phone: '手机',
    email: '邮箱',
    company: '单位',
    company_mark: '单位标识',
    organization: '部门',
    job: '职位',
    idCard: '身份证'
  }

  private rules: Rules = {
    name: [
      { required: true, message: '姓名必填' },
      { validator: () => nameLengthValidator(this.form.name), message: '姓名必须大于等于2位且小于20位' }
    ],
    phone: [
      { required: true, message: '手机号必填' },
      { validator: () => phoneFormatValidator(this.form.phone), message: '请检查手机号格式' }
    ],
    captcha: [
      { required: true, message: '短信验证码必填' }
    ],
    email: [
      { validator: () => { return this.form.email === '' || emailFormatValidator(this.form.email) }, message: '请检查邮箱格式' }
    ],
    company: [
      { required: true, message: '单位必填' },
      { validator: () => stringLengthValidator(this.form.company), message: '必须小于64位' }
    ],
    otherCompany: [
      { required: true, message: '其他单位必填' }
    ],
    organization: [
      { validator: () => stringLengthValidator(this.form.organization), message: '必须小于64位' }
    ],
    job: [
      { validator: () => stringLengthValidator(this.form.job), message: '必须小于64位' }
    ],
    idCard: [
      { required: true, message: '身份证必填' },
      { validator: () => idCardFormatValidator(this.form.idCard), message: '请检查身份证格式' }
    ]
  }

  private memberImageList: Array<UploadFile> = []

  private isSubmitting = false // 是否正在提交

  private isShowCompanyPicker = false // 是否展示单位选择

  private isSending = false // 是否正在发送验证码

  private delaySeconds = 60 // 多少秒后可重新发送

  private langOptions: Array<Option> = [
    { text: '中科启元', value: '中科启元', actual: 0, max: 40, disabled: false },
    { text: '中科启程', value: '中科启程', actual: 0, max: 40, disabled: false },
    { text: '中科启智', value: '中科启智', actual: 0, max: 20, disabled: false },
    { text: '其他', value: '其他', actual: 0, max: 70, disabled: false }
  ]

  get isEmailValid (): boolean {
    return phoneFormatValidator(this.form.phone) // 手机号格式是否合格
  }

  public async getCode (): Promise<void> {
    // const res = await getCaptcha({ mobile: this.form.phone })
    const res = await this.$axios.get(`/verify_code?mobile=${this.form.phone}`, { mobile: this.form.phone })
    if (res.data.res === 0) {
      this.$toast.success('发送成功')
      this.delaySeconds = 60
      this.isSending = true
      const temp = setInterval(() => {
        if (this.delaySeconds <= 0) {
          this.isSending = false
          clearInterval(temp)
        }
        this.delaySeconds--
      }, 1000)
    } else {
      this.$toast.fail(res.data.message)
    }
  }

  public async onSubmit (): Promise<void> {
    // 图片限制
    if (this.memberImageList.length > 1) {
      this.$toast.fail('只能上传一张图片')
      return
    }
    this.isSubmitting = true
    // 构建attrs
    const array: Array<object> = []
    const submitForm = JSON.parse(JSON.stringify(this.form))
    // company 为 其他，进行处理
    submitForm.company_mark = submitForm.company
    if (submitForm.company === '其他') {
      submitForm.company = submitForm.otherCompany
    }
    Object.keys(submitForm).map((item) => {
      if (this.formMap[item]) {
        const temp = {
          tag: this.formMap[item],
          value_type: 1,
          value: (submitForm as any)[item]
        }
        array.push(temp)
      }
    })
    try {
      const res = await memberRegister({
        meeting_key: '35ebd30d16194113a10b20f36731484c',
        secret_key: '1ff123d237aa4e968090c8811db8c1fe',
        image: this.memberImageList[0] ? this.memberImageList[0].file : undefined,
        attributes: JSON.stringify(array),
        member_id: this.form.phone,
        verify: this.form.captcha
      })
      // let data = new FormData()
      // data.append('meeting_key', '35ebd30d16194113a10b20f36731484c')
      // data.append('secret_key', '1ff123d237aa4e968090c8811db8c1fe')
      // data.append('image', this.memberImageList[0] ? this.memberImageList[0].file : undefined)
      // data.append('attributes', JSON.stringify(array)) 
      // data.append('member_id', this.form.phone)
      // data.append('verify', this.form.captcha)
      // const res = await this.$axios.post('/enrollment', data, { headers: {'Content-Type': 'multipart/form-data' }})
      if (res.data.res === 0) {
        this.$toast.success('会议报名成功')
        this.$router.push('/result_page/meeting_register_success')
      }
    } catch (err) {
      console.log(err)
    }
    this.isSubmitting = false
  }

  public async checkNumberLimit () {
    try {
      const res = await memberCount({
        meeting_key: '35ebd30d16194113a10b20f36731484c',
        secret_key: '1ff123d237aa4e968090c8811db8c1fe'
      })
        // let data = new FormData()
        // data.append('meeting_key', '35ebd30d16194113a10b20f36731484c')
        // data.append('secret_key', '1ff123d237aa4e968090c8811db8c1fe')
        // const res = await this.$axios.post('/member_count', data)
      if (res.data.res === 0) {
        this.langOptions.map(item => {
          item.actual = res.data.data[item.text]
          if (item.actual >= item.max) {
            item.disabled = true
            item.text += '（人数已满）'
          }
        })
      }
      this.isShowCompanyPicker = true
    } catch (err) {
      console.log(err)
    }
  }

  public changeCompany (val: Option): void {
    if (val.disabled) {
      this.$toast.fail('人数已满')
      this.isShowCompanyPicker = false
      return
    }
    this.form.company = val.value
    this.isShowCompanyPicker = false
  }
}
</script>

<style lang="stylus" scoped>
.page-wrap
  .info_wrap
    padding 1rem 2rem
  .mini-desc
    text-align center
    font-size 10px
    color: #666

a
  text-decoration underline
h2
  margin 1rem 0
p
  text-align left
</style>
