import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';

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
            history.push('/home')
        })
        .catch(error => {
          console.log(error);
          alert('Sorry cannot add book')
        })
      };

    return (
        <div>
            <p>Feeling: {feeling}</p>
            <p>Understanding: {understanding}</p>
            <p>Support: {support}</p>
            <p>Comments: {comments}</p>
            <button onClick={handleSubmit}>Submit Feedback</button>
        </div>
    );
    
}

export default Review;
