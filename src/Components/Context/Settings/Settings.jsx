import React, { useReducer } from 'react'
import { stateReducer, initialState } from '../../../hooks/Reducer/reducer'
export const SettingContext = React.createContext()
export default function Settings({ children }) {

    const [settings, dispatch] = useReducer(stateReducer, initialState)
    console.log(settings)
    let vals = { settings, dispatch }
    return (
        <SettingContext.Provider value={vals}>
            {children}
        </SettingContext.Provider>
    )
}
