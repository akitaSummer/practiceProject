import React from 'react'
import { useRouter } from 'next/router'
import scss from './index.module.scss'

const id = () => {

    const router = useRouter()

    return (
        <div className={scss.color}>
            <h2>query: { JSON.stringify(router.query) }</h2>
        </div>
    )
}

export default id