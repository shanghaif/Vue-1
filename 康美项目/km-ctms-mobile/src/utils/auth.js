import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
	setToken('5200f884d62b4981993722bbf8bdf505')
  	return Cookies.get(TokenKey)
}

export function setToken(token) {
  	return Cookies.set(TokenKey, token)
}

export function removeToken() {
  	return Cookies.remove(TokenKey)
}
