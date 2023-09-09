import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import { useDispatch } from 'react-redux';

function Feeling() {

    const [feeling, setFeeling] = useState(5);

    const history = useHistory();
    const dispatch = useDispatch()

    // Called when the submit button is pressed
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            {
            type: 'INPUT_FEELING', 
            payload: feeling
            }
        );
        setFeeling(5);
        history.push('/understanding')
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="number" onChange={(e)=>setFeeling(e.target.value)}id="quantity" min="1" max="10" required></input>
            <button type="submit">Next</button>
        </form>
    );
    
}

export default Feeling;
