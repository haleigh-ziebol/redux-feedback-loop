import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

//MUI components
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

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

function Understanding() {

    const [understanding, setUnderstanding] = useState('');
    const useStoredResponse = useSelector((store)=>store.goBackReducer);
    const storedUnderstanding = useSelector((store)=>store.understandingReducer);

    const history = useHistory();
    const dispatch = useDispatch()

    //used with back button
    const setStoredResponse = () => {
        if (useStoredResponse === true){
            setUnderstanding(storedUnderstanding)
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
            type: 'INPUT_UNDERSTANDING', 
            payload: understanding
            }
        );
        setUnderstanding(5);
        history.push('/support')
    }

    // Called when the back button is pressed
    const handleBack = (e) => {
        e.preventDefault();
        dispatch(
            {
            type: 'UPDATE', 
            }
        );
        history.push('/feeling')
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
                        <button onClick={handleClose}>Exit</button>
                    </div>
                    <h2>How well are you understanding the content?</h2>
                    <h3>On a scale of 0-10</h3>
                    <form onSubmit={handleSubmit}>
                        <input type="number" value={understanding} onChange={(e)=>setUnderstanding(e.target.value)}id="quantity" min="1" max="10" required></input>
                        <div id="nav-buttons">
                            <button onClick={handleBack}>Back</button>
                            <button type="submit">Next</button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
    
}

export default Understanding;
