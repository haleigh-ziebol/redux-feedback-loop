import { useState } from "react";
import { useCookies } from "react-cookie";

//MUI components
import { Modal } from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';

function Login() {
    const [cookies, setCookie, removeCookie] = useCookies(null);
    //function for modal

    const signOut = () => {
        console.log('signout');
        removeCookie('Email');
        removeCookie('AuthToken')
        //refresh
    }

    return(
        <div className="login-bar">
            <Stack spacing={4} direction="row" justifyContent="space-evenly">
                <Button>Log In</Button>
                <Button>Sign Up</Button>
            </Stack>
        </div>
    )


}

export default Login;