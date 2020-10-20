import axios from './axios'
// 请求方式
const GET = 'get'
const POST = 'post'

const SEETA = '/seeta' // URL前缀

const REGISTER = '/register'
// 获取验证码
const getCaptcha = (data: object) => axios(GET, SEETA + REGISTER + '/verify_code', data)
// 会议报名
const memberRegister = (data: object) => axios(POST, SEETA + REGISTER + '/enrollment', data, { 'Content-Type': 'multipart/form-data' })
// 获取单位人数
const memberCount = (data: object) => axios(POST, SEETA + REGISTER + '/member_count', data, { 'Content-Type': 'multipart/form-data' })

export { getCaptcha, memberRegister, memberCount }
