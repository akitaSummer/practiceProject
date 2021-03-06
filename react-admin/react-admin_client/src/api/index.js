// 包含应用中所有接口请求函数的模块
// 每个函数的返回值都是promise
import json from 'jsonp'
import { message } from 'antd'
import ajax from './ajax'

// 登录
export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST')
// 添加用户
export const reqAddOrUpdateUser = (user) => ajax('/manage/user/'+(user._id ? 'update' : 'add'), user, 'POST')
// 更新角色
export const reqUpdateRole = (role) => ajax('/manage/role/update', role, 'POST')
// 获取分类列表
export const reqCategorys = (parentId) => ajax('/manage/category/list', {parentId})
// 添加分类
export const reqAddCategory = (categoryName, parentId) => ajax('/manage/category/add', {categoryName, parentId}, 'POST')
// 更新分类
export const reqUpdateCategorys = (categoryId, categoryName) => ajax('/manage/category/update', {categoryId, categoryName})
// 获取商品分页列表
export const reqProducts = (pageNum, pageSize) => ajax('/manage/product/list', {pageNum, pageSize})
// 搜索商品分页列表
export const reqSearchProducts = ({pageNum, pageSize, searchName, searchType}) => ajax('/manage/product/search', {pageNum, pageSize, [searchType]: searchName})
// 获取一个分类
export const reqCategory = ({categoryId}) => ajax('/manage/category/ingo', {categoryId})
// 更新商品的状态(上架/下架)
export const reqUpdateStatus = ({productId, status}) => ajax('/manage/product/updateStatus', {productId, status}, 'POST')
// 图片删除接口
export const reqDeleteImg = (name) => ajax('/manage/img/delete', {name}, 'POST')
// 添加/添加商品
export const reqAddOrUpdateProduct = (product) => ajax(`/manage/product/${product._id ? 'update' : 'add'}`, product, 'POST')
// 修改商品
// export const reqUpdateProduct = (product) => ajax('/manage/product/update', product, 'POST')
// 获取所有角色列表
export const reqRoles = () => ajax('/manage/role/list')
// 添加角色
export const reqAddRole = (roleName) => ajax('/manage/role/add', {roleName}, 'POST')
// 获取所有用户的列表
export const reqUsers = () => ajax('/manage/user/list')
// 删除指定用户
export const reqDeleteUser = (userId) => ajax('/manage/user/delete',{userId}, 'POST')


// json 请求的接口请求函数
/*
jsonp解决ajax跨域的原理
  1). jsonp只能解决GET类型的ajax请求跨域问题
  2). jsonp请求不是ajax请求, 而是一般的get请求
  3). 基本原理
   浏览器端:
      动态生成<script>来请求后台接口(src就是接口的url)
      定义好用于接收响应数据的函数(fn), 并将函数名通过请求参数提交给后台(如: callback=fn)
   服务器端:
      接收到请求处理产生结果数据后, 返回一个函数调用的js代码, 并将结果数据作为实参传入函数调用
   浏览器端:
      收到响应自动执行函数调用的js代码, 也就执行了提前定义好的回调函数, 并得到了需要的结果数据
 */
export const reqWeather = (city) => {

  return new Promise((resolve, reject) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    json(url, {}, (err, data) => {
      // 成功
      if (!err && data.status === 'success') {
        // 取出需要的数据
        const {dayPictureUrl, weather} = data.results[0].weather_data[0]
        resolve({dayPictureUrl, weather})
      } else {
        // 失败
        message.error('获取当前地区天气失败')
      }
    })
  })
}