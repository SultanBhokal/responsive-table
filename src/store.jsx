import { createContext, useContext, useEffect, useReducer } from "react";

const CommentsContext = createContext();


export const useComments = () => {
    return useContext(CommentsContext)
}

const source =   () => {

    const pageFromLocalStorage =   localStorage.getItem("page")
    


    const [{ comments, search, totalComments, totalCommentsOnPage, startInd, lastInd, loading,keySearch }, dispatch] = useReducer((state, action) => {

        switch (action.type) {
            case "setComments":
                return { ...state, comments: action.payload }

            case "setSearch":
                return { ...state, search: action.payload }

            case "setTotalCommentsOnPage":
                return { ...state, totalCommentsOnPage: action.payload }

            case "setTotalComments":
                return { ...state, totalComments: action.payload }

            case "setStartInd":
                return { ...state, startInd: action.payload }

            case "setLastInd":
                return { ...state, lastInd: action.payload }

            case "setPageNum":
                return { ...state, pageNum: action.payload }

            case "setLoading":
                return { ...state, loading: action.payload }
            case "setKeySearch":
                return {...state,keySearch:action.payload}
            
            default:
                return { ...state }
        }

    }, {
        comments: [],
        search: "",
        totalCommentsOnPage: pageFromLocalStorage !== null?pageFromLocalStorage:25,
        totalComments: 0,
        startInd: 0,
        lastInd: pageFromLocalStorage !== null ? pageFromLocalStorage:25,
        pageNum: 1,
        loading: true,
        keySearch:[]
    })


    useEffect(() => {
        async function getComments() {
            try {
                const res = await fetch("https://dev.ylytic.com/ylytic/test", {
                    // credentials: 'include',
                })
                const data = await res.json()
                
                dispatch({
                    type: "setComments",
                    payload: data?.comments
                })

                dispatch({
                    type: "setTotalComments",
                    payload: data?.comments?.length
                })

                dispatch({
                    type: "setLoading",
                    payload: false
                })


            } catch (error) {
                dispatch({
                    type:"setError",
                    payload:"Server is down please try again later",
                })
            }
        }
        getComments()
    }, [])


    const dispatchAction = (action) => {
        dispatch({ ...action })
    }



    return { search, comments, totalComments, totalCommentsOnPage, dispatchAction, startInd, lastInd, loading,keySearch }


}

export function CommentsProvider({ children }) {
    return (
        <CommentsContext.Provider value={source()}>
            {children}
        </CommentsContext.Provider>
    )
}