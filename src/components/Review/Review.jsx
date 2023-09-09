import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function Review() {

    const history = useHistory();
    const dispatch = useDispatch()
    const feeling = useSelector((store)=>store.feelingReducer);
    const understanding = useSelector((store)=>store.understandingReducer);
    const support = useSelector((store)=>store.supportReducer);
    const comments = useSelector((store)=>store.commentReducer);

    return (
        <div>
            <p>Feeling: {feeling}</p>
            <p>Understanding: {understanding}</p>
            <p>Support: {support}</p>
            <p>Comments: {comments}</p>
        </div>
    );
    
}

export default Review;
