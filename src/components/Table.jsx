import React, { useMemo } from 'react'
import { useComments } from '../store'
import ShowLessMore from './ShowLessMore';

import "./table.css";
import { useState, useEffect } from 'react';



export default function Table() {

    const { comments, startInd, lastInd, search,dispatchAction,keySearch } = useComments()
    const [currentSortKey, setCurrentSortKey] = useState("at")
    const [order, setOrder] = useState("asc")


    const [sortComments, setSortedComments] = useState(comments)

    const filterComments = sortComments?.slice(startInd, lastInd)

    function sortByKey(key) {


        let result;
        if (key === "at") {

            result = comments?.sort((a, b) => {
                return new Date(b?.at) - new Date(a.at)
            })
        }

        if (key === "author" || key === "text") {
            result = comments?.sort((a, b) => {
                return a[key]?.localeCompare(b[key])
            })
        }

        if (key === "like" || key === "reply") {
            result = comments?.sort((a, b) => {
                return a[key] - b[key];
            })
        }

        if (key === currentSortKey && order === "asc") {

            setSortedComments(result?.reverse())
            setOrder("desc")

        }
        else {
            setOrder("asc")
            setSortedComments(result)
            setCurrentSortKey(key)
        }

    }


    useMemo(() => {
        if (search) {
            setSortedComments(() => {
                return comments?.filter(comment => {
                    return comment?.author?.toLowerCase().includes(search?.toLowerCase()) || comment?.text?.toLowerCase().includes(search?.toLowerCase())
                })
            })

            

            
        }
        else {
            
            setSortedComments(comments)
        }
    }, [search])

    const setSearch = (value)=>{
        
            dispatchAction({
                type:"setSearch",
                payload:value
            })

            dispatchAction({
                type:"setKeySearch",
                payload:[...keySearch,value]
            })
        
    }





    return (
        <div className='table-container'>
            <div className='labels'>
                <p>AT<button className={currentSortKey === "at" && order === "asc" ? "down-arrow" : "down-arrow down-arrow-rev"} onClick={() => sortByKey("at")}></button></p>
                <p>AUTHOR<button className={currentSortKey === "author" && order === "desc" ? "down-arrow" : "down-arrow down-arrow-rev"} onClick={() => sortByKey("author")}></button></p>
                <p>LIKES<button className={currentSortKey === "like" && order === "desc" ? "down-arrow" : "down-arrow down-arrow-rev"} onClick={() => sortByKey("like")}></button></p>
                <p>REPLY<button className={currentSortKey === "reply" && order === "desc" ? "down-arrow" : "down-arrow down-arrow-rev"} onClick={() => sortByKey("reply")}></button></p>
                <p>TEXT<button className={currentSortKey === "text" && order === "desc" ? "down-arrow" : "down-arrow down-arrow-rev"} onClick={() => sortByKey("text")}></button></p>
            </div>
            <table className='table-content'>
                <thead>
                    <tr>
                        
                        <th>AT<span className={currentSortKey === "at" && order === "asc" ? "down-arrow" : "down-arrow down-arrow-rev"} onClick={() => sortByKey("at")}></span></th>
                        <th>AUTHOR<span className={currentSortKey === "author" && order === "desc" ? "down-arrow" : "down-arrow down-arrow-rev"} onClick={() => sortByKey("author")}></span></th>
                        <th>LIKES<span className={currentSortKey === "like" && order === "desc" ? "down-arrow" : "down-arrow down-arrow-rev"} onClick={() => sortByKey("like")}></span></th>
                        <th>REPLY<span className={currentSortKey === "reply" && order === "desc" ? "down-arrow" : "down-arrow down-arrow-rev"} onClick={() => sortByKey("reply")}></span></th>
                        <th>TEXT<span className={currentSortKey === "text" && order === "desc" ? "down-arrow" : "down-arrow down-arrow-rev"} onClick={() => sortByKey("text")}></span></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filterComments?.map(comment => {
                            return (
                                <tr key={comment?.at}>
                                    

                                    <td data-label='AT'>{comment?.at}</td>
                                    <td data-label='AUTHOR' className='link' onClick={()=>setSearch(comment?.author)}>{comment?.author}</td>
                                    <td data-label='LIKES'>{comment?.like}</td>
                                    <td data-label='REPLY'>{comment?.reply}</td>
                                    <td data-label='TEXT'>
                                        <ShowLessMore limit={60}>
                                            {comment?.text}
                                        </ShowLessMore></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
