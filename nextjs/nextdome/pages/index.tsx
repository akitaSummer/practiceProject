import React, { FC, useEffect } from 'react'
import Link from 'next/link'
import Router, { useRouter, withRouter, NextRouter } from 'next/router'
import Head from 'next/head'
import css from './index.module.css'

interface Iprops {
    router: NextRouter
}

const Index: FC<Iprops> = (props) => {

    const router = useRouter()

    const withRouter = props.router

    const arr = [1, 2, 3]

    useEffect(() => {
        router.prefetch('/cmp/News')
    }, [])

    return (
        <div>
            <Head>
                <title>nextjs</title>
                <meta charSet='utf-8'/>
            </Head>
            {/* <style jsx>{`
                p {
                    color: blue;
                }
            `}</style>
            <style global jsx>{`
                body {
                    background: #000;
                }
            `}</style> */}
            <h2 className={css.color}>hello world</h2>
            <img src="nextjs-logo.png" alt="nextjs-logo"/>
            <Link href='/About?name=123' as='a' prefetch>
                <a>About</a>
            </Link>
            <br/>
            <button onClick={() => {router.push('/cmp/News')}}>News</button>
            <br/>
            <button onClick={() => {router.push({ pathname: "/About", query: { name: 'useRouter' } })}}>useRouter</button>
            <br/>
            <button onClick={() => {Router.push({ pathname: "/About", query: { name: 'Router' } })}}>Router</button>
            <br/>
            <button onClick={() => {withRouter.push({ pathname: "/About", query: { name: 'withRouter' } })}}>withRouter</button>
            {
                arr.map((item) => {
                    return(
                        <React.Fragment key={item}>
                            <br/>
                            <Link href='/list/[id]' as={`/list/${item}`}>
                                <a>List ID: {item}</a>
                            </Link>
                        </React.Fragment>
                    )
                })
            }
            <br/>
            <Link href='/cmp/[...id]' as='/cmp/123/456'>
                <a>cmp ID</a>
            </Link>
        </div>
    )
}

export default withRouter(Index)