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

function Comments() {

    const [comment, setComment] = useState('');

    const history = useHistory();
    const dispatch = useDispatch()

    // Called when the submit button is pressed
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            {
            type: 'INPUT_COMMENT', 
            payload: comment
            }
        );
        setComment(5);
        history.push('/review')
    }

    //Modal
    const [open, setOpen] = useState(true);
    const handleClose = () =>{
        setOpen(false);
        history.push('/')
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
                    <h2>Any comments you want to leave?</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="text" value={comment} onChange={(e)=>setComment(e.target.value)} />
                        <button type="submit">Next</button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
    
}

export default Comments;
