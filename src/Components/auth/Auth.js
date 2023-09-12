import React, { useContext } from 'react'
import { When } from 'react-if';
import { LoginContext } from '../Context/LoginContext/LoginContext';



export default function Auth({ children, capability }) {
    const { loginData, can } = useContext(LoginContext)
    const isLoggedIn = loginData.loggedIn;
    const canDo = capability ? can(capability) : true;
    const okToRender = isLoggedIn && canDo;
    console.log(canDo, isLoggedIn)
    return (
        <When condition={okToRender}>
            {children}
        </When>
    )
}
