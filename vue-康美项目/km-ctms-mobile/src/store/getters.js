const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  pageTitle: state => state.app.pageTitle,
  device: state => state.app.device,
  navigatorBack: state => state.app.navigatorBack,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  setting: state => state.user.setting,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  dict: state => state.dict
}
export default getters
