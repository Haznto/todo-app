import React, { useReducer } from 'react'
import { initialState, listReducer } from '../../../hooks/Reducer/listReducer'
export const ListContext = React.createContext()
export default function ListsSaver({ children }) {

    const [data, dispatch] = useReducer(listReducer, initialState)
    console.log(data)
    let listManage = { data, dispatch }
    return (
        <ListContext.Provider value={listManage}>
            {children}
        </ListContext.Provider>
    )
}
