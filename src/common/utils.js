import * as _ from 'lodash'

const debounce = function(fn,wait,options) {
  return _.debounce(fn,wait,options)
}

export function formatDate(date, fmt) {
  //判断是否存在y
  if (/(y+)/.test(fmt)) {
    //将fmt中的y按照位数替换成年份
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};

export default {
  debounce,
  formatDate
}
