import request from '../utils/request'

export const getMusicList = (params) => {
  return request('get', `/music/get/top`, params)
}

export const getInitVideoConfig = () => {
  return request('get', `/config/get/index`)
}

export const getDetailsConfig = () => {
  return request('get', `/config/get/illustration`)
}

export const getIllustrationConfig = () => {
  return request('get', `/config/get/illustration`)
}