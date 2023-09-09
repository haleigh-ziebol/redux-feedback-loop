import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import { useDispatch } from 'react-redux';

//MUI components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

function Modal() {

    //Modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box>
            <form onSubmit={handleSubmit}>
            <input type="number" value={feeling} onChange={(e)=>setFeeling(e.target.value)}id="quantity" min="1" max="10" required></input>
            <button type="submit">Next</button>
            </form>
          </Box>
        </Modal>
      </div>

    );
    
}

export default Modal;
