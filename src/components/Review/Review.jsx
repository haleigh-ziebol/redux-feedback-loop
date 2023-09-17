import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';

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

function Review() {

    const history = useHistory();
    const axios = Axios;
    const dispatch = useDispatch();

    const feeling = useSelector((store)=>store.feelingReducer);
    const understanding = useSelector((store)=>store.understandingReducer);
    const support = useSelector((store)=>store.supportReducer);
    const comments = useSelector((store)=>store.commentReducer);
    const userEmail = 'test@test.com';
    
    const handleSubmit = () => {
        let newFeedback = {
                userEmail: userEmail,
                feeling: feeling,
                understanding: understanding,
                support: support,
                comments: comments
        }
        axios.post('/feedback', newFeedback)
        .then(response =>{
            history.push('/submitted');
            dispatch({type: 'EXIT_BACK'})
        })
        .catch(error => {
          console.log(error);
          alert('Sorry cannot add book')
        })
    }

    // Called when the back button is pressed
    const handleEdit = (e) => {
        e.preventDefault();
        history.push('/edit')
    }
    
    //Modal
    const [open, setOpen] = useState(true);
    const handleClose = () =>{
        setOpen(false);
        history.push('/')
        dispatch({type:'EXIT_BACK'})
    }

    return (
        <div>
            <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack>
                        <div>
                            <Button variant="text" onClick={handleClose}>Exit</Button>
                        </div>
                        <h1>Review Your Feedback</h1>
                        <p><b>Feeling: </b> {feeling}</p>
                        <p><b>Understanding: </b> {understanding}</p>
                        <p><b>Support: </b> {support}</p>
                        <p><b>Comments: </b>{comments}</p>
                        <br/>
                        <br/>
                        <Stack spacing={2} direction="row" justifyContent="center">
                                <Button variant="contained" onClick={handleEdit}>Edit Feedback</Button>
                                <Button variant="contained" onClick={handleSubmit}>Submit Feedback</Button>
                        </Stack>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
    
}

export default Review;
