import React, { useCallback } from 'react'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'

import { add } from '../store/actions'
import Layout from '../components/Layout'
import RedLink from '../components/RedLink'

/**
 * Link 标签路由
 * href 添加跳转路径（默认是history的push）
 *  可以是字符串'/about?abc=123'
 *  可以是对象{ pathname: "/about", query: { name: 'abc' } }
 * as
 *  重命名
 *  路由传参 list/1
 * replace history中的replace
 * scroll 跳转后到页面顶部，默认true
 * passhref 强制Link到href发送给子项，默认为false
 * Link子项是组件
 * 如果Link的子项是一个组件需要用React.forwardRef去传递href, React.forwardRef是一个函数，函数的参数是props和ref
 * 
 * js跳转
 * useRouter React Hook
 *  router.push('/about', '/about/1')
 *  router.push({ pathname: "/about", query: { name: 'abc' } })
 * Router 
 *  router.push('/about', '/about/1')
 *  router.push({ pathname: "/about", query: { name: 'abc' } })
 * withRouter
 *  router.push('/about', '/about/1')
 *  router.push({ pathname: "/about", query: { name: 'abc' } })
 * 
 * 预加载
 * Link的prefetch属性
 * js中Router.perfetch
 * 
 * 路由事件
 *  routeChangeStart(url) 路由跳转开始
 *  routeChangeComplete(url) 路由跳转完成
 *  routeChangeError(err, url) 路由跳转失败
 *  beforeHistoryChange(url) 浏览器历史改变
 */

Router.events.on('routeChangeStart', (url) => {
    if (url === '/list') {
        location.href = '/cmp/News'
    }
})


const About = () => {

    const count = useSelector((state) => state.count)

    const dispatch = useDispatch()

    const increment = useCallback(() => {
        dispatch(add(1))
    }, [dispatch])

    const router = useRouter()

    return (
        <Layout>
            <h2>This is about page</h2>
            <h2>query: { router.query.name }</h2>
            <h2>count: { count }</h2>
            <button onClick={() => increment()}>+1</button>
            <Link href='/'>
                <button>Index</button>
            </Link>
            <Link href='/' passHref>
                <RedLink/> 
            </Link>
        </Layout>
    )
}

export default About