import axios from 'axios'

export function request(config) {
  const ins = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout : 6000
  })

  ins.interceptors.request.use(config => {
    return config
  },err => {
    console.log(err);
  })

  ins.interceptors.response.use(res => {
    return res.data
  },err => {
    console.log(err);
  })

  return ins(config)
}
