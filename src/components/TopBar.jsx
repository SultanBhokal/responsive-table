import React from 'react'
import "./topbar.css";
import { useComments } from '../store';

export default function TopBar() {

    const {dispatchAction,search,totalCommentsOnPage}= useComments()

    function changeCommentsPerPage(value){
        dispatchAction({
            type:"setTotalCommentsOnPage",
            payload:value
        })
        dispatchAction({
            type:"setLastInd",
            payload:value
        })

        localStorage.setItem("page",value)
    }

    const setSearch = (value)=>{
        dispatchAction({
            type:"setSearch",
            payload:value
        })
    }

    const removeSearch = ()=>{
        dispatchAction({
            type:"setSearch",
            payload:""
        })
    }

  return (
    <div className='topbar'>
        <div className='form-control-div'>
            <input type='text' placeholder='Filter' className='form-control' value={search} onChange={e=>setSearch(e.target.value)} />
            <button type='button' className='form-btn' onClick={()=>removeSearch()}>x</button>
        </div>
        <div>
            <select defaultValue={totalCommentsOnPage} className='select-form' onChange={e=>changeCommentsPerPage(e.target.value)}>
                <option value={25}>25 per page</option>
                <option value={50}>50 per page</option>
                <option value={100}>100 per page</option>
            </select>
        </div>
    </div>
  )
}
