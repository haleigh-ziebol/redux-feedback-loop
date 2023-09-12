import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

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

function Feeling() {

    const [feeling, setFeeling] = useState('');

    const useStoredResponse = useSelector((store)=>store.goBackReducer);
    const storedFeeling = useSelector((store)=>store.feelingReducer);

    const history = useHistory();
    const dispatch = useDispatch();
    
    //used with back button
    const setStoredResponse = () => {
        if (useStoredResponse === true){
            setFeeling(storedFeeling)
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
                    <Stack spacing={2}>
                        <div>
                            <Button variant ="text" onClick={handleClose}>Exit</Button>
                        </div>
                        <h2>How are you feeling today?</h2>
                        <h3>On a scale of 0-10</h3>
                        <form onSubmit={handleSubmit}>
                        <input type="number" value={feeling} onChange={(e)=>setFeeling(e.target.value)}id="quantity" min="1" max="10" required></input>
                        <br/>
                        <br/>
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

export default Feeling;
