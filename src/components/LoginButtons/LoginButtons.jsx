import React, { useState } from "react";
import { useCookies } from "react-cookie";
import {useHistory} from 'react-router-dom';
import { useDispatch } from "react-redux";

//MUI components
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';

function LoginButtons() {
    const [cookies, setCookie, removeCookie] = useCookies(null);
    const [isLoggedin, setIsLoggedin] = useState(false);

    const history = useHistory();
    const dispatch = useDispatch();

    //insert dispatch to set type for modal

    const handleSignOut = () => {
        console.log('signout');
        removeCookie('Email');
        removeCookie('AuthToken');
        history.push('/');
        //refresh
    }

    const handleSignup = () => {
        dispatch({type: 'SET_SIGNUP'});
        history.push('/entersite');

    }

    return(
        <div className="login-bar">
            { !isLoggedin &&
                <Stack spacing={4} direction="row" justifyContent="space-evenly">
                    <Button onClick={()=>history.push('/entersite')}>Log In</Button>
                    <Button onClick={handleSignup}>Sign Up</Button>
                </Stack>
            }
            { isLoggedin &&
                <Button onClick={handleSignOut}>Log Out</Button>            
            }
        </div>
    )

}

export default LoginButtons;