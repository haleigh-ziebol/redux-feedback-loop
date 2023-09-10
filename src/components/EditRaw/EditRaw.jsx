import React, { useState} from 'react';
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

function EditRaw() {

    const history = useHistory();
    const feelingStored = useSelector((store)=>store.feelingReducer);
    const understandingStored = useSelector((store)=>store.understandingReducer);
    const supportStored = useSelector((store)=>store.supportReducer);
    const commentsStored = useSelector((store)=>store.commentReducer);
    const axios = Axios;

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
                    <h1>Edit Your Feedback</h1>
                    <label for="feeling">Feeling:</label>
                    <input 
                        type="number" id="feeling" 
                        value={feeling} onChange={(e)=>setFeeling(e.target.value)}
                        min="1" max="10" required 
                    />
                    <br/>
                    <label for="understanding">Understanding:</label>
                    <input 
                        type="number" id="understanding" 
                        value={understanding} onChange={(e)=>setUnderstanding(e.target.value)}
                        min="1" max="10" required 
                    />
                    <br/>
                    <label for="support">Support:</label>
                    <input 
                        type="number" id="support" 
                        value={support} onChange={(e)=>setSupport(e.target.value)}
                        min="1" max="10" required 
                    />
                    <br/>
                    <label for="comments">Comments:</label>
                    <input type="text" id="comments"
                    value={comment} onChange={(e)=>setComment(e.target.value)} 
                    />
                    <br/>
                    <br/>
                    <div id="nav-buttons">
                            <button onClick={handleSubmit}>Submit Feedback</button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
    
}

export default EditRaw;
