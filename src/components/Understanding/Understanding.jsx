import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import { useDispatch } from 'react-redux';

function Understanding() {

    const [understanding, setUnderstanding] = useState(5);

    const history = useHistory();
    const dispatch = useDispatch()

    // Called when the submit button is pressed
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            {
            type: 'INPUT_UNDERSTANDING', 
            payload: understanding
            }
        );
        setUnderstanding(5);
        history.push('/support')
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="number" onChange={(e)=>setUnderstanding(e.target.value)}id="quantity" min="1" max="10" required></input>
            <button type="submit">Next</button>
        </form>
    );
    
}

export default Understanding;
