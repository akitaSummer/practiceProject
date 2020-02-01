import Vue from 'vue'

const baseURL = '/api'

// 1、根据经纬度获取位置详情
export const reqAddress = (geohash) => Vue.prototype.$ajax.get(baseURL + `/position/${geohash}`)
// 2、获取食品分类列表
export const reqFoodCategorys = () => Vue.prototype.$ajax.get(baseURL + '/index_category')
// 3、根据经纬度获取商铺列表
export const reqShops = ({longitude, latitude}) =>  Vue.prototype.$ajax.get(baseURL + '/shops', {params: {longitude, latitude}})
// 4、根据经纬度和关键字搜索商铺列表
export const reqSearchShop = (geohash, keyword) => Vue.prototype.$ajax.get(baseURL+'/search_shops', {params: {geohash, keyword}})
// 6、用户名密码登陆
export const reqPwdLogin = ({name, pwd, captcha}) => Vue.prototype.$ajax.post(baseURL+'/login_pwd', {name, pwd, captcha})
// 7、发送短信验证码
export const reqSendCode = (phone) => Vue.prototype.$ajax.get(baseURL+'/sendcode', {params: {phone}})
// 8、手机号验证码登陆
export const reqSmsLogin = (phone, code) => Vue.prototype.$ajax.post(baseURL+'/login_sms', {phone, code})
// 9、根据会话获取用户信息
export const reqUserInfo = () => Vue.prototype.$ajax.get(baseURL+'/userinfo')
// 10、用户登出
export const reqLogout = () => Vue.prototype.$ajax.get(baseURL+'/logout')

/**
 * 获取商家信息
 */
export const reqShopInfo = () => Vue.prototype.$ajax.get('/info')

/**
 * 获取商家评价数组
 */
export const reqShopRatings = () => Vue.prototype.$ajax.get('/ratings')

/**
 * 获取商家商品数组
 */
export const reqShopGoods = () => Vue.prototype.$ajax.get('/goods')
