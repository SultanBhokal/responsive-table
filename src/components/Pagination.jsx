import React, {  useState } from 'react'
import { useComments } from '../store'
import "./pagination.css"

export default function Pagination() {

    const { dispatchAction, totalCommentsOnPage, totalComments ,search} = useComments()
    const [activePage, setActivePage] = useState(1)
    const num = []
    const [pageNum, setPageNum] = useState(1)
    for (let i = 1; i <= Math.ceil(totalComments / totalCommentsOnPage); i++) {
        num.push(i)
    }

    function changePageNumber(num) {
        const lastInd = num * totalCommentsOnPage;
        const firstInd = lastInd - totalCommentsOnPage;
        setActivePage(num)

        dispatchAction({
            type: "setStartInd",
            payload: firstInd
        })
        dispatchAction({
            type: "setLastInd",
            payload: lastInd
        })


        setPageNum(num)
    }

    if(search) return 
    return (
        <div className='pagination'>
            <button className={activePage === 1 || activePage > num.length ? "btn-deactive" : "btn"} onClick={() => {
                if (activePage !== 1 && activePage <= num.length) return changePageNumber(activePage - 1)
            }}>
                {"<<"}
            </button>


            <button className={activePage === 1 || activePage >num.length ? "btn-deactive" : "btn"}
            onClick={()=>{if(activePage !== 1 && activePage<=num.length)return changePageNumber(1)}}
            >
                First
            </button>
            {
                num?.map(num => {
                    return <button key={num} className={num === pageNum ? "btn-active" : "btn"} onClick={() => changePageNumber(num)}>{num}</button>
                })
            }
            <button className={activePage === num.length || activePage > num.length ?"btn-deactive":"btn"}
            onClick={()=>{if(activePage!== num.length && activePage <= num.length)return changePageNumber(num.length)}}
            >
            Last
            </button>
            <button className={activePage === num.length || activePage > num.length?"btn-deactive":"btn"}
             onClick={() => {
                if (activePage!== num.length && activePage < num.length) return changePageNumber(activePage + 1)
            }}>
            {">>"}
            </button>
        </div>
    )
}
