import React from 'react'
// import fetch from 'node-fetch'
const fs = require('fs')

const id = (props) => {

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

export default id

export const getServerSideProps = async (context) => {

    // const { query: { id } } = context

    // const res = await fetch(`http://localhost:3000/api/list/${id}`)

    // const data = await res.json()

    // return {
    //     props: {
    //         data
    //     }
    // }

    const res = fs.readFileSync(`${process.cmd()}/json/data.json`, 'utf-8')

    const data = JSON.parse(res).result.data.filter(() => (id === item.songId))

    return {
        props: {
            data
        }
    }

}