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

function AuthModal() {

    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const history = useHistory();
    const dispatch = useDispatch();

    const loginMode = useSelector((store)=>store.loginModalReducer);



    // Called when the submit button is pressed
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            {
            type: 'INPUT_FEELING', 
            payload: feeling
            }
        );
        setFeeling('');
        history.push('/understanding')
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
                        {!loginMode && <h1>Sign up!</h1>}
                        {loginMode && <h1>Log in!</h1>}
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="email">Email Address:</label>
                            <input type="text" id ="email" 
                                value={userEmail} onChange={(e)=>setUserEmail(e.target.value)} 
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
                                <Button variant="contained" type="submit">Next</Button>
                            </div>
                        </form>
                    </Stack>
                </Box>
            </Modal>
      </div>

    );
    
}

export default AuthModal;