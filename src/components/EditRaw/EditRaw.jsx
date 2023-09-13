import React, { useState} from 'react';
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

function EditRaw() {

    const history = useHistory();
    const dispatch = useDispatch();
    const axios = Axios;

    const feelingStored = useSelector((store)=>store.feelingReducer);
    const understandingStored = useSelector((store)=>store.understandingReducer);
    const supportStored = useSelector((store)=>store.supportReducer);
    const commentsStored = useSelector((store)=>store.commentReducer);

    //for inputs
    const [feeling, setFeeling] = useState(feelingStored);
    const [understanding, setUnderstanding] = useState(understandingStored);
    const [support, setSupport] = useState(supportStored);
    const [comment, setComment] = useState(commentsStored);

    const handleSubmit = () => {
        let newFeedback = {
                feeling: feeling,
                understanding: understanding,
                support: support,
                comments: comment
        }
        axios.post('/feedback', newFeedback)
        .then(response =>{
            history.push('/submitted');
        })
        .catch(error => {
          console.log(error);
          alert('Sorry cannot add feedback')
        })
    }
    
    //Modal
    const [open, setOpen] = useState(true);
    const handleClose = () =>{
        setOpen(false);
        history.push('/')
        dispatch({type: 'EXIT_BACK'})
    } //end Modal

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
                        <h1>Edit Your Feedback</h1>
                        <label htmlFor="feeling">Feeling:</label>
                        <input 
                            type="number" id="feeling" 
                            value={feeling} onChange={(e)=>setFeeling(e.target.value)}
                            min="1" max="10" required 
                        />
                        <br/>
                        <label htmlFor="understanding">Understanding:</label>
                        <input 
                            type="number" id="understanding" 
                            value={understanding} onChange={(e)=>setUnderstanding(e.target.value)}
                            min="1" max="10" required 
                        />
                        <br/>
                        <label htmlFor="support">Support:</label>
                        <input 
                            type="number" id="support" 
                            value={support} onChange={(e)=>setSupport(e.target.value)}
                            min="1" max="10" required 
                        />
                        <br/>
                        <label htmlFor="comments">Comments:</label>
                        <input type="text" id="comments"
                        value={comment} onChange={(e)=>setComment(e.target.value)} 
                        />
                        <br/>
                        <br/>
                        <div>
                                <Button variant="contained"onClick={handleSubmit}>Submit Feedback</Button>
                        </div>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
    
}

export default EditRaw;
