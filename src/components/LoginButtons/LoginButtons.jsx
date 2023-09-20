import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import {useHistory} from 'react-router-dom';
import { useDispatch } from "react-redux";

//MUI components
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';

function LoginButtons() {
    const [cookies, setCookie, removeCookie] = useCookies(null);
    const authToken = cookies.AuthToken;

    const history = useHistory();
    const dispatch = useDispatch();

    const handleSignOut = () => {
        console.log('signout');
        removeCookie('Email');
        removeCookie('AuthToken');
        history.push('/entersite');
        dispatch({type:'UPDATE_FLAGGED', payload: null}); //clears flags for next user
        window.location.reload;
    }

    const handleSignup = () => {
        dispatch({type: 'SET_SIGNUP'}); //window will open in sign up mode
        history.push('/entersite'); 
    }

    useEffect(() => {
        () => {window.location.reload}
    }, [])
    
    return(
        <div className="login-bar">
            { !authToken &&
                <Stack spacing={4} direction="row" justifyContent="space-evenly">
                    <Button onClick={()=>history.push('/entersite')}>Log In</Button>
                    <Button onClick={handleSignup}>Sign Up</Button>
                </Stack>
            }
            { authToken &&
                <Button onClick={handleSignOut}>Log Out</Button>            
            }
        </div>
    )

}

export default LoginButtons;