import request from '@/utils/request'

export function getSport() {
  return request({
    url: '/lifeStyle/getPersonSport',
    method: 'get',
    params: {}
  })
}

export function saveSport(data) {
  return request({
    url: '/lifeStyle/savePersonSport',
    method: 'post',
    data
  })
}

export function getEatHabit() {
  return request({
    url: '/lifeStyle/getPersonEatHabit',
    method: 'get',
    params: {}
  })
}
export function saveEatHabit(data) {
  return request({
    url: '/lifeStyle/savePersonEatHabit',
    method: 'post',
    data
  })
}

export function getSmokeDrink() {
  return request({
    url: '/lifeStyle/getPersonSmokeDrink',
    method: 'get',
    params: {}
  })
}
export function saveSmokeDrink(data) {
  return request({
    url: '/lifeStyle/savePersonSmokeDrink',
    method: 'post',
    data
  })
}

export function getHealthHistory() {
  return request({
    url: '/HealthHistory',
    method: 'get',
    params: {}
  })
}
export function saveHealthHistory(data) {
  return request({
    url: '/HealthHistory',
    method: 'post',
    data
  })
}
