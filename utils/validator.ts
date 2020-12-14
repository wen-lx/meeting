// 输入校验相关
// 姓名长度
export const nameLengthValidator = (val: string): boolean => (/^.{2,20}$/).test(val)
// 字符串长度
export const stringLengthValidator = (val: string): boolean => (/^.{0,64}$/).test(val)

// 邮箱格式
export const emailFormatValidator = (val: string): boolean => (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/).test(val)

// 手机号格式asdfa
export const phoneFormatValidator = (val: string): boolean => (/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/).test(val)

// 身份证格式adsf
export const idCardFormatValidator = (val: string): boolean => (/(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0[1-9]|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/).test(val)
