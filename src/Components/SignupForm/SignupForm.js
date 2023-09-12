import { Button, Center, Flex, Input } from '@mantine/core'
import React, { useContext, useState } from 'react'
import { LoginContext } from '../Context/LoginContext/LoginContext';
import { When } from 'react-if';
import axios from 'axios';

export default function SignUp() {
    const [usernameS, setUsernameS] = useState('')
    const [passwordS, setPasswordS] = useState('')
    const [role, setRole] = useState('')
    const { login, loginData } = useContext(LoginContext)
    console.log(usernameS, passwordS)
    async function handleSignupSub(e) {
        e.preventDefault();
        try {
            let res = await axios.post('https://auth-api-fz5h.onrender.com/signup', {
                username: usernameS,
                password: passwordS,
                role: role
            })
            console.log(res);
            alert(`You have Signed up Successfully ${usernameS}`)
        } catch (err) {
            console.log('login ', err);
        }
        login(usernameS, passwordS);
        setPasswordS('')
        setUsernameS('')
        setRole('')
    }
    function handlePwChange(e) {
        setPasswordS(e.target.value);
    }
    function handleUnChange(e) {
        setUsernameS(e.target.value);
    }
    function handleRoleChange(e) {
        setRole(e.target.value);
    }
    return (
        <>

            <When condition={!loginData.loggedIn}>

                <form onSubmit={handleSignupSub}>
                    <Flex direction={'column'} m={'20px'} gap={'10px'} justify={Center} align={Center}>
                        <Input onChange={handleUnChange} placeholder='username' required />
                        <Input onChange={handlePwChange} placeholder='password' required type='password' />
                        <Input onChange={handleRoleChange} placeholder='role' required type='text' />
                        <Button type='submit'>SignUp</Button>
                    </Flex>
                </form>
            </When >
        </>
    )
}
