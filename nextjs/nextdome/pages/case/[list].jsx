import React from 'react'
import fetch from 'node-fetch'

const list = (props) => {

    const { data } = props

    return (
        <div>
            {
                data.map((item) => {
                    <React.Fragment key={item.songStringId}>
                        <h2>{item.songName}</h2>
                        <img src={item.albumLogo} width='40'/>
                        <hr/>
                        {
                            item.singerVos.map((i) => {
                                return (
                                    <React.Fragment>
                                        <h2>{i.artistName}</h2>
                                        <img src={i.artistLogo} width='40'/>
                                    </React.Fragment>
                                )
                            })
                        }
                    </React.Fragment>
                })
            }
        </div>
    )
}

export default list

// getStaticPaths() 会静态化 异步async 只能在pages下 用于生成动态路由 是服务器请求(http)

export const getStaticPaths = async () => {

    const res = await fetch('http://localhost:3000/api/list')

    const data = await res.json()

    const paths = data.result.data.map((item) => {
        return {
            param: { list: `${item.songId}` }
        }
    })

    return {
        paths,
        fallback: false
    }
}

/**
 * getStaticProps() 会静态化 异步async 只能在pages下 用于请求数据 是服务器请求(http)
 *  getStaticProps({ params, previesw, perviewData })
 *  在动态路由文件[xxx].js中使用
 *  params: 接收getStaticPaths()返回的动态路径，方便请求动态数据，如 http://localhost:3000/list/xxx
 *  getStaticProps返回值为一个对象，其中对象必须有一个key值为props，并且这个props作为该组件的props
 */

export const getStaticProps = async (context) => {

    const { params: { list } } = context

    const res = await fetch(`http://localhost:3000/api/list/${list}`)

    const data = await res.json()

    return {
        props: {
            data
        }
    }
}