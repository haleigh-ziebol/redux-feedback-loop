import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';

//MUI components
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';

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

function Submitted() {

    const history = useHistory();

    const handleSubmit = () => {
        history.push('/feeling')
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
                        <Button variant="text" onClick={handleClose}>Exit</Button>
                    </div>
                    <br/>
                    <img src='https://images.ctfassets.net/sfnkq8lmu5d7/5s1kya8JDQapExFKfM8ahI/20f07aaace35649eefb27022a2f13556/2021_0517-catGotchaDay-AdobeStock_235571404.jpg?w=1000&h=750&fl=progressive&q=70&fm=jpg'
                        width='250' height='200'/>
                    <h1>Party Cat thanks you!</h1>
                    <Button variant="contained" onClick={handleSubmit}>Leave More Feedback</Button>
                </Box>
            </Modal>
        </div>
    );
    
}

export default Submitted;
