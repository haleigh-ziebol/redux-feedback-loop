import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';

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

function Review() {

    const history = useHistory();
    const feeling = useSelector((store)=>store.feelingReducer);
    const understanding = useSelector((store)=>store.understandingReducer);
    const support = useSelector((store)=>store.supportReducer);
    const comments = useSelector((store)=>store.commentReducer);
    const axios = Axios;
    const dispatch = useDispatch();

    const handleSubmit = () => {
        let newFeedback = {
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
                    <div>
                        <button onClick={handleClose}>Exit</button>
                    </div>
                    <h1>Review Your Feedback</h1>
                    <p>Feeling: {feeling}</p>
                    <p>Understanding: {understanding}</p>
                    <p>Support: {support}</p>
                    <p>Comments: {comments}</p>
                    <div id="nav-buttons">
                            <button onClick={handleEdit}>Edit Feedback</button>
                            <button onClick={handleSubmit}>Submit Feedback</button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
    
}

export default Review;
