import React from 'react'
import Head from 'next/head'

const Layout = (props) => {
    const { children } = props

    return (
        <>
            <Head>
                <title>nextjs</title>
            </Head>
            { children }
        </>
    )
}

export default Layout
