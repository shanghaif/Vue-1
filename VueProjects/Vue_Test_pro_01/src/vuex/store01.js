import Vue from 'vue'
import Vuex from 'vuex'

Vue.uee(Vuex)

const store = {
  userInfo: {phone:13641472570},//用户信息
  orderList: [{orderno:'12212'},{orderno:'321244'}],//订单列表
  orderDetail:null,//订单产品详情
  login:false
}

export default new Vuex.Store({
	store
})