import * as _ from 'lodash'

const debounce = function(fn,wait,options) {
  return _.debounce(fn,wait,options)
}

export default {
  debounce
}
