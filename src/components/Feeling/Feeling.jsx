import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import { useDispatch } from 'react-redux';

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

function Feeling() {

    const [feeling, setFeeling] = useState(5);

    const history = useHistory();
    const dispatch = useDispatch()

    // Called when the submit button is pressed
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            {
            type: 'INPUT_FEELING', 
            payload: feeling
            }
        );
        setFeeling(5);
        history.push('/understanding')
    }

    //Modal
    const [open, setOpen] = React.useState(true);
    const handleClose = () => setOpen(false);
    

    return (
        <div>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h2>How are you feeling today?</h2>
                    <h3>On a scale of 0-10</h3>
                    <form onSubmit={handleSubmit}>
                    <input type="number" value={feeling} onChange={(e)=>setFeeling(e.target.value)}id="quantity" min="1" max="10" required></input>
                    <button type="submit">Next</button>
                    </form>
                </Box>
            </Modal>
      </div>

    );
    
}

export default Feeling;
