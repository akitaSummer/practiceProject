import React, { FC } from 'react'
import { useRouter } from 'next/router'

const id: FC<{}> = () => {

    const router = useRouter()

    return (
        <div>
            <h2>query: { JSON.stringify(router.query) }</h2>
        </div>
    )
}

export default id