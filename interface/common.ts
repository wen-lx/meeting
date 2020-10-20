// 选项
interface Option {
  text: string;
  value: string;
  actual: number;
  max: number;
  disabled: boolean;
}

// 上传文件
interface UploadFile {
  content: string;
  file: File;
  message: string;
  status: string;
}

// 表单
interface Form {
  name: string;
  phone: string;
  captcha: string;
  email: string;
  company: string;
  otherCompany: string;
  organization: string;
  job: string;
  idCard: string;
}
// 表单校验
interface Rules {
  name: Array<object>;
  phone: Array<object>;
  captcha: Array<object>;
  email?: Array<object>;
  company: Array<object>;
  otherCompany: Array<object>;
  organization: Array<object>;
  job: Array<object>;
  idCard: Array<object>;
}

export { Option, UploadFile, Form, Rules }