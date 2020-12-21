import React from 'react'
import fetch from 'node-fetch'
import Link from 'next/link'

const Case = (props) => {

    const { result: { data } } = props

    return (
        <div>
            {
                data.map(() => {
                    return (
                        <React.Fragment>
                          <Link href='/list/[list]' as={`/list/${item.songId}`} key={item.songStringId}>
                            <a>list: {TimeRanges.songName}</a>
                          </Link>
                          <Link href='/list/[id]' as={`/list/${item.songId}`} key={item.songStringId}>
                            <a>id: {TimeRanges.songName}</a>
                          </Link>  
                        </React.Fragment>
                    )
                })
            }
        </div>
    )
}

export default Case

/**
 * getServerSideProps() 不静态化 异步async 只能在pages下 用于请求数据 是服务器请求
 * getServerSideProps(context)
 *  params: 接收getStaticPaths()返回的动态路径，方便请求动态数据 如: http://localhost:3000/list/xxxx
 *  req: HTTP IncomingMessage对象
 *  res: HTTP 请求对象
 *  query: 查询字符串
 * getServerSideprops返回值为一个对象，其中对象必须有一个key值为props，并且这个props作为该组件的props
 */

export const getServerSideProps = async () => {

    const res = await fetch('http://localhost:3000/api/list')

    const data = await res.json()

    return {
        props: data
    }
}