import React, { useEffect, useReducer } from 'react';
import cookie from 'react-cookies';
import jwt_decode from 'jwt-decode';
import { initialState, loginReducer } from '../../../hooks/Reducer/loginReducer';

const testUsers = {
    Admininistrator: {
        password: 'admin',
        name: 'Administrator',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWRtaW5pc3RyYXRvciIsInJvbGUiOiJhZG1pbiIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJywncmVhZCcsJ3VwZGF0ZScsJ2RlbGV0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.pAZXAlTmC8fPELk2xHEaP1mUhR8egg9TH5rCyqZhZkQ'
    },
    Editor: {
        password: 'editor',
        name: 'Editor',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRWRpdG9yIiwicm9sZSI6ImVkaXRvciIsImNhcGFiaWxpdGllcyI6IlsncmVhZCcsJ3VwZGF0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.3aDn3e2pf_J_1rZig8wj9RiT47Ae2Lw-AM-Nw4Tmy_s'
    },
    Writer: {
        password: 'writer',
        name: 'Writer',

        // token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV3JpdGVyIiwicm9sZSI6IndyaXRlciIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.dmKh8m18mgQCCJp2xoh73HSOWprdwID32hZsXogLZ68'
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV3JpdGVyIiwicm9sZSI6IndyaXRlciIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJywncmVhZCddIiwiaWF0IjoxNTE2MjM5MDIyfQ.ZF3YwbjuC6zrqmbGbWbaqWFFlswC5BvfMFc-eYmYSAo'
    },
    User: {
        password: 'user',
        name: 'User',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVXNlciIsInJvbGUiOiJ1c2VyIiwiY2FwYWJpbGl0aWVzIjoiWydyZWFkJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.WXYvIKLdPz_Mm0XDYSOJo298ftuBqqjTzbRvCpxa9Go'
    },
};

export const LoginContext = React.createContext();

function LoginProvider(props) {
    const [loginData, dispatch] = useReducer(loginReducer, initialState)

    //   constructor(props) {
    //     super(props);
    //     this.state = {
    //       loggedIn: false,
    //       can: this.can,
    //       login: this.login,
    //       logout: this.logout,
    //       user: { capabilities: [] },
    //       error: null,
    //     };
    //   }

    function can(capability) {
        return loginData.user.capabilities?.includes(capability);
    }

    async function login(username, password) {
        console.log('running')
        let { loggedIn, token, user } = loginData;
        let auth = testUsers[username];
        console.log(auth)

        if (auth && auth.password === password) {
            try {
                validateToken(auth.token);
            } catch (e) {
                setLoginState(loggedIn, token, user, e);
                console.error(e);
            }
        }
    }

    function logout() {
        setLoginState(false, null, {});
    };

    function validateToken(token) {
        try {
            let validUser = jwt_decode(token);
            console.log(validUser)
            setLoginState(true, token, validUser);
            console.log('login-State', loginData.loggedIn)
        }
        catch (e) {
            setLoginState(false, null, {}, e);
            console.log('Token Validation Error', e);
        }

    };

    function setLoginState(loggedIn, token, user, error) {
        cookie.save('auth', token);
        // this.setState({ token, loggedIn, user, error: error || null });

        dispatch({ type: 'changeLoginStatus', payload: loggedIn })
        dispatch({ type: 'changeToken', payload: token })
        dispatch({ type: 'changeUser', payload: user })
        dispatch({ type: 'changeError', payload: error })
    };

    function componentDidMount() {
        const qs = new URLSearchParams(window.location.search);
        const cookieToken = cookie.load('auth');
        const token = qs.get('token') || cookieToken || null;
        validateToken(token);
    }
    useEffect(() => {
        componentDidMount()
        // const authCookie = cookie.load('auth');
        // if (authCookie) {
        //     validateToken(authCookie)
        // } else {
        //     setLoginState(false, null, {})
        // }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <LoginContext.Provider value={{ can, login, logout, loginData, dispatch }}>
            {props.children}
        </LoginContext.Provider>
    );

}

export default LoginProvider;