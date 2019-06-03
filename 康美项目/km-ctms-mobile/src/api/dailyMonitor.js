import request from '@/utils/request'

export function getBloodPressureRecord() {
  return request({
    url: '/DailyMonitor/GetBloodPressureRecord',
    method: 'get',
    params: {}
  })
}
export function getBloodSugarRecord() {
  return request({
    url: '/DailyMonitor/GetBloodSugarRecord',
    method: 'get',
    params: {}
  })
}
export function getHeartRateRecord() {
  return request({
    url: '/DailyMonitor/GetHeartRateRecord',
    method: 'get',
    params: {}
  })
}
export function getStepReocrd() {
  return request({
    url: '/DailyMonitor/GetStepReocrd',
    method: 'get',
    params: {}
  })
}
export function getBloodOxygenRecord() {
  return request({
    url: '/DailyMonitor/GetBloodOxygenRecord',
    method: 'get',
    params: {}
  })
}
export function getVitalCapacityRecord() {
  return request({
    url: '/DailyMonitor/GetVitalCapacityRecord',
    method: 'get',
    params: {}
  })
}

export function saveBloodSugar(data) {
  return request({
    url: '/DailyMonitor/SaveBloodSugar',
    method: 'post',
    data
  })
}
export function saveBloodPressure(data) {
  return request({
    url: '/DailyMonitor/SaveBloodPressure',
    method: 'post',
    data
  })
}

export function saveBloodOxygenRecord(data) {
  return request({
    url: '/DailyMonitor/SaveBloodOxygenRecord',
    method: 'post',
    data
  })
}

export function saveHeartRate(data) {
  return request({
    url: '/DailyMonitor/SaveHeartRate',
    method: 'post',
    data
  })
}

export function saveStepRecord(data) {
  return request({
    url: '/DailyMonitor/SaveStepRecord',
    method: 'post',
    data
  })
}

export function saveVitalCapacityRecord(data) {
  return request({
    url: '/DailyMonitor/SaveVitalCapacityRecord',
    method: 'post',
    data
  })
}

export function getBloodPressureReport(type) {
  return request({
    url: '/DailyMonitor/GetBloodPressureReport' + '?reportTimeType=' + type,
    method: 'get',
    params: {}
  })
}

export function getBloodSugarReport(type) {
  return request({
    url: '/DailyMonitor/GetBloodSugarReport' + '?reportTimeType=' + type,
    method: 'get',
    params: {}
  })
}
