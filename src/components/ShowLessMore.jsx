import React, { useState } from 'react'
import "./showless.css"

export default function ShowLessMore({limit,children}) {
    const [readmore,setReadmore] = useState(false)

    if(children?.length < 60) return (<div>{children}</div>)

  return (
    <div className='readmore'>
        {
        readmore?
        children
        :
        children?.slice(0,limit) + "..."
        }
        <a className='read-link' href='#' onClick={(e)=>{
            setReadmore(prev=>!prev)
            e.preventDefault()
        }}>{!readmore?"show":" less"}</a>
    </div>
  )
}
