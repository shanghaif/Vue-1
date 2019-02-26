import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  userInfo: 1234567,//用户信息
  orderList: [{orderno:'12212'},{orderno:'321244'}],//订单列表
  count: 3,
  orderDetail:{orderno:'12212',price:23.5},//订单产品详情
  login:false
};

export default new Vuex.Store({
	state,
	getters: {
		orderListCount: state => state.orderList.length,
		infoStr:state=>{
			return state.userInfo.phone + ', orderCount: ' + orderListCount
		},

	}
})