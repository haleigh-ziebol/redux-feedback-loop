import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
    const dispatch = useDispatch()
    const feeling = useSelector((store)=>store.feelingReducer);
    const understanding = useSelector((store)=>store.understandingReducer);
    const support = useSelector((store)=>store.supportReducer);
    const comments = useSelector((store)=>store.commentReducer);
    const axios = Axios;

    const handleSubmit = () => {
        let newBook = {
                feeling: feeling,
                understanding: understanding,
                support: support,
                comments: comments
        }
        axios.post('/feedback', newBook)
        .then(response =>{
            setOpen(false);
            alert('Your feedback was submitted')
        })
        .catch(error => {
          console.log(error);
          alert('Sorry cannot add book')
        })
    }
    
    //Modal
    const [open, setOpen] = useState(true);
    const handleClose = () =>{
        setOpen(false);
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
                    <button onClick={handleSubmit}>Submit Feedback</button>
                </Box>
            </Modal>
        </div>
    );
    
}

export default Review;
