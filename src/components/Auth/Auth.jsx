import React, { useState } from "react";
import { useCookies } from "react-cookie";

function Auth() {
    
    const [isLogin, setIsLogin] = useState(false);
    const [error, setError] = useState(null);
    const[email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(null)

    const viewLogin = (status) => {
        setError(null);
        setIsLogin(status)
    }


    const handleSubmit = async (e, endpoint) => {
        e.preventDefault();
        if (!isLogin && password !== confirmPassword) {
            setError('Make sure passwords match!')
            return
        }
        const response = await fetch(`${process.env.REACT_APP_SERVERURL}/${endpoint}`, {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({email, password})
        })
        const data = await response.json()
        if (data.detail){
            setError(data.detail)
        }
        else {
            setCookie('Email', data.email);
            setCookie('AuthToken', data.token)
            //reload
        }
    }

    return(
        <div className ="auth-container">
            <div>
                <form onSubmit={(e) => handleSubmit(e,isLogin ? 'login' : 'signup')}>
                    <h2>{isLogin ? 'Please log in' : 'Please sign up'}</h2>
                    <input type="email" onChange={() => setEmail(e.target.value)} />
                    <input type="password" onChange={() => setPassword(e.target.value)} placeholder="password" />
                    {!isLogin && <input type="password" onChange={() => setConfirmPassword(e.target.value)} placeholder="confirm password" />}
                    <button type="submit"></button>
                    {error && <p>{error}</p>}
                </form>
                <div>
                    <button onClick={viewLogin(false)}>Sign up</button>
                    <button onClick={viewLogin(true)}>Log in</button>
                </div>
            </div>
        </div>
    )
}

export default Auth;