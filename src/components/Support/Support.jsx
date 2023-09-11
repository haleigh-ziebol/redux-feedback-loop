import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

//MUI components
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

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

function Support() {

    const [support, setSupport] = useState('');
    const useStoredResponse = useSelector((store)=>store.goBackReducer);
    const storedSupport = useSelector((store)=>store.supportReducer);

    const history = useHistory();
    const dispatch = useDispatch()

    //used with back button
    const setStoredResponse = () => {
        if (useStoredResponse === true){
            setSupport(storedSupport)
        }
    }

    useEffect(() => {
        setStoredResponse(); //run when page loads
      }, [])

    // Called when the submit button is pressed
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            {
            type: 'INPUT_SUPPORT', 
            payload: support
            }
        );
        setSupport(5);
        history.push('/comments')
    }

    // Called when the back button is pressed
    const handleBack = (e) => {
        e.preventDefault();
        dispatch(
            {
            type: 'UPDATE', 
            }
        );
        history.push('/understanding')
    }

    //Modal
    const [open, setOpen] = useState(true);
    const handleClose = () =>{
        setOpen(false);
        history.push('/');
        dispatch({type: 'EXIT_BACK'})
    }

    return (
        <div>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div>
                        <Button variant="text" onClick={handleClose}>Exit</Button>
                    </div>
                    <h2>How well are you being supported?</h2>
                    <h3>On a scale of 0-10</h3>
                    <form onSubmit={handleSubmit}>
                        <input type="number" value={support} onChange={(e)=>setSupport(e.target.value)}id="quantity" min="1" max="10" required />
                        <br/>
                        <br/>
                        <Stack spacing={2} direction="row" justifyContent="center">
                            <Button variant="contained" onClick={handleBack}>Back</Button>
                            <Button variant="contained" type="submit">Next</Button>
                        </Stack>
                    </form>
                </Box>
            </Modal>
        </div>
    );
    
}

export default Support;
