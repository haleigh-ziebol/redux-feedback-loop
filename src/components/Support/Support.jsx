import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import { useDispatch } from 'react-redux';

function Support() {

    const [support, setSupport] = useState(5);

    const history = useHistory();
    const dispatch = useDispatch()

    // Called when the submit button is pressed
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            {
            type: 'INPUT_SUPPORT', 
            payload: support
            }
        );
        setSupport(5);
        history.push('/comments')
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="number" value={support} onChange={(e)=>setSupport(e.target.value)}id="quantity" min="1" max="10" required />
            <button type="submit">Next</button>
        </form>
    );
    
}

export default Support;
