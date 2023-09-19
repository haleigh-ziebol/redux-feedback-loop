import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';

//MUI components
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

//box style
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

//code from Ania Kubow Todo App Tutorial

function AuthModal() {

    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies(null)

    const loginMode = useSelector((store)=>store.loggingInReducer);

    const history = useHistory();
    const dispatch = useDispatch();

    console.log(cookies)

    // set login vs sign up
    const viewLogin = (status) => {
        if(status){
            dispatch({type: 'SET_LOGIN'});
            setError(null);
        }
        else if (!status) {
            dispatch({type: 'SET_SIGNUP'}); 
            setError(null);
        }
    }

    // Called when the submit button is pressed
    const handleSubmit = async (e, endpoint) => {
        e.preventDefault();
        if (!loginMode && password !== confirmPassword) {
            setError('Make sure passwords match!')
            return
        }
        const response = await fetch (`/user/${endpoint}`, {
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
                window.location.reload
                setOpen(false);
                history.push('/');
            }
    }

    //Modal
    const [open, setOpen] = useState(true);
    const handleClose = () =>{
        setOpen(false);
        history.push('/');
    }//end Modal

    return (
        <div>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack spacing={2}>
                        <div>
                            <Button variant ="text" onClick={handleClose}>Exit</Button>
                        </div>
                        <h2>{loginMode ? 'Please log in' : 'Please sign up'}</h2>
                        
                        <form onSubmit={(e) => handleSubmit(e,loginMode ? 'login' : 'signup')}>
                            <label htmlFor="email">Email Address:</label>
                            <input type="text" id ="email" 
                                value={email} onChange={(e)=>setEmail(e.target.value)} 
                                placeholder="email address" required 
                            />
                            <br/>
                            <br/>
                            <label htmlFor="password">Password:</label>
                            <input type="text" id ="password" 
                                value={password} onChange={(e)=>setPassword(e.target.value)} 
                                placeholder="password" required 
                            />
                            <br/>
                            <br/>
                            { !loginMode && 
                            <div>
                                <label htmlFor="confirmpw">Confirm Password:</label>
                                <input type="text" id ="confirmpw" 
                                    value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} 
                                    placeholder="password" required 
                                />
                                <br/>
                                <br/>
                            </div>
                            }
                            <div >
                                <Button variant="contained" type="submit">Submit</Button>
                                {error && <p>{error}</p>}
                            </div>
                        </form>
                        <br/>
                        <div>
                            <p>Set Mode:</p>
                            <Button variant="text" onClick={() => viewLogin(false)}>Sign up</Button>
                            <Button variant="text" onClick={() => viewLogin(true)}>Log in</Button>
                        </div>
                    </Stack>
                </Box>
            </Modal>
      </div>

    );
    
}

export default AuthModal;