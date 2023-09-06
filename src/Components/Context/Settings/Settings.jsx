import React, { useEffect, useReducer } from 'react'
import { stateReducer, initialState } from '../../../hooks/Reducer/reducer'
export const SettingContext = React.createContext()
export default function Settings({ children }) {

    const [settings, dispatch] = useReducer(stateReducer, initialState, () => {
        const localData = localStorage.getItem('settings');
        return localData ? JSON.parse(localData) : initialState;
    })
    console.log(settings)
    let vals = { settings, dispatch }

    useEffect(() => {
        // console.log(book)
        localStorage.setItem('settings', JSON.stringify(settings))
    }, [settings])
    return (
        <SettingContext.Provider value={vals}>
            {children}
        </SettingContext.Provider>
    )
}
