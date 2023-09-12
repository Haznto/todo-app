import { Button, Center, Flex, Input } from '@mantine/core'
import React, { useContext, useState } from 'react'
import { LoginContext } from '../Context/LoginContext/LoginContext';
import { When } from 'react-if';

export default function LoginForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { login, logout, loginData } = useContext(LoginContext)
    console.log(username, password)
    function handleLoginSub(e) {
        e.preventDefault();
        login(username, password);
    }
    function handlePwChange(e) {
        setPassword(e.target.value);
    }
    function handleUnChange(e) {
        setUsername(e.target.value);
    }
    return (
        <>
            <When condition={loginData.loggedIn}>
                <Button color='red' onClick={logout}>Log Out</Button>
            </When>
            <When condition={!loginData.loggedIn}>
                <form onSubmit={handleLoginSub}>
                    <Flex direction={'row'} justify={Center} align={Center}>
                        <Input onChange={handleUnChange} placeholder='username' required />
                        <Input onChange={handlePwChange} placeholder='password' required type='password' />
                        <Button type='submit'>Login</Button>
                    </Flex>
                </form>
            </When>
        </>
    )
}
