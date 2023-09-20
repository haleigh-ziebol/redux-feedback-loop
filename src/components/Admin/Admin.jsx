import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';

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
    const [cookies, setCookie, removeCookie] = useCookies(null);
    const authToken = cookies.AuthToken;

    //fetch feedback list
    const fetchData = () => {
        axios.get('/feedback/adminlist')
        .then((response) =>{
            console.log(response.data);
            setFeedbackList(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    // runs fetchData on page load
    useEffect ( () => {
        if (authToken) {
            fetchData();
        }}
    , []) //end feedback list

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
    }

    //runs openDialog when dialogOpen variable = true
    useEffect(() => {
        fetchData();
        if(dialogOpen) {
            openDialog();
        }

    }, [dialogOpen]) //end dialog

    //edit mode
    const editView = useSelector((store)=>store.editViewReducer); 
    
    const toggleEdit = () => {
        dispatch({type: 'TOGGLE_EDIT'});
        fetchData();
    } // end edit mode

    //for handle delete
    const IDtoDelete = useSelector((store)=>store.deleteIDReducer); 

    const handleDelete = () => {
        handleClose();
        let id = IDtoDelete
        axios.delete(`/feedback/${id}`)
        .then((response) =>{
            console.log(response.data);
            fetchData();
            fetchFlagged();
            handleClose();
        })
        .catch((error) => {
            console.log(error);
        })
    } //end handleDelete


    //fetch notification number for flagged feedback
    const fetchFlagged= () => {
        axios.get('/feedback/flagged')
        .then((response) =>{
            dispatch({type:'UPDATE_FLAGGED', payload: response.data.count});
        })
        .catch((error) => {
            console.log(error);
        })
    } /// end fetchFlagged

    //runs fetchFlagged
    useEffect(() => {
        fetchFlagged()
    }, [cookies]) //end flagged

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
                <Button onClick={handleClose}>Nope</Button>
                <Button onClick={handleDelete} autoFocus>
                    Yee haw!
                </Button>
                </DialogActions>
            </Dialog>
            
            <br/>
            <br/>
            {
                (feedbackList.length ==0) ?
                <div>
                    <p>No feedback currently! Check back later.</p>
                </div> :

                <div>
                        <div className="table-header">
                            <h1>Feedback</h1>
                            <Button onClick={toggleEdit}>Edit</Button>
                        </div>

                    <table>
                        <thead>
                            <tr>
                                <th>Feeling</th>
                                <th>Understanding</th>
                                <th>Support</th>
                                <th>Comments</th>
                                {editView && <th>Delete</th>}
                                {editView && <th>Flag</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {feedbackList.map((feedback) => {
                                return (
                                    <FeedbackItem feedback={feedback} fetchData={fetchData} fetchFlagged={fetchFlagged} />
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}

export default Admin;