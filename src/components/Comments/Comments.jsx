import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import { useDispatch } from 'react-redux';

function Comments() {

    const [comment, setComment] = useState('');

    const history = useHistory();
    const dispatch = useDispatch()

    // Called when the submit button is pressed
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            {
            type: 'INPUT_COMMENT', 
            payload: comment
            }
        );
        setComment(5);
        history.push('/review')
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={comment} onChange={(e)=>setComment(e.target.value)} />
            <button type="submit">Next</button>
        </form>
    );
    
}

export default Comments;
