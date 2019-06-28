import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
	setToken('6ac5db116a3a49698aa214b37df3dcbe')
  	return Cookies.get(TokenKey)
}

export function setToken(token) {
  	return Cookies.set(TokenKey, token)
}

export function removeToken() {
  	return Cookies.remove(TokenKey)
}
