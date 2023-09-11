import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

//child components
import FeedbackItem from '../FeedbackItem/FeedbackItem.jsx'

//mui components
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function Admin(){
    const axios = Axios;
    const [feedbackList, setFeedbackList] = useState([]);  

    //fetch feedback list
    const fetchData = () => {
        axios.get('/feedbacklist')
        .then((response) =>{
        console.log(response.data);
        setFeedbackList(response.data);
        })
        .catch((error) => {
        console.log(error)
        })
    }

    //dialog
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const dialogOpen = useSelector((store)=>store.deleteDialogReducer);

    const openDialog = () => {
            setOpen(true)
    }
  
    const handleClose = () => {
      setOpen(false);
      dispatch({type: 'DELETE_ID', payload: ''})
      dispatch({type: 'CLOSE_DIALOG'})
    }//end dialog

    //handle delete
    const IDtoDelete = useSelector((store)=>store.deleteIDReducer); 

    const handleDelete = () => {
        handleClose();
        let id = IDtoDelete
        axios.delete(`/feedback/${id}`)
        .then((response) =>{
        console.log(response.data);
        fetchData();
        handleClose();
        })
        .catch((error) => {
        console.log(error)
        })
      }

    //runs fetchData & openDialog
    useEffect(() => {
        fetchData(); //run when page loads
        if(dialogOpen) {
            openDialog();
        }

    }, [dialogOpen])

    return(
        <div>
            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure that you'd like to delete this feedback?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Nope!</Button>
                <Button onClick={handleDelete} autoFocus>
                    Yee haw!
                </Button>
                </DialogActions>
            </Dialog>
            {
                (feedbackList.length ==0) ?

                <p>No feedback currently! Check back later.</p> :

                <table>
                    <thead>
                        <tr>
                            <th>Feeling</th>
                            <th>Understanding</th>
                            <th>Support</th>
                            <th>Comments</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedbackList.map((feedback) => {
                            return (
                                <FeedbackItem feedback={feedback} />
                            )
                        })}
                    </tbody>
                </table>
            }
        </div>
    )
}

export default Admin;