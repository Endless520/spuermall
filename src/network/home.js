import {request} from "./request";

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(tab,page) {
  return request({
    url: '/home/data',
    params: {
      type: tab,
      page
    }
  })
}
