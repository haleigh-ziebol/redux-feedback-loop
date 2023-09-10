import React from 'react';
import {useHistory} from 'react-router-dom';

function Home(){
    const history = useHistory();
    return(
        <div>
            <div>
                <h1>Help us help you!</h1>
                <h3>Your feedback informs our teaching! We want you to succeed!</h3>
            </div>
            <br/>
            <div>
                <button onClick={()=>history.push('/feeling')}>Submit Feedback </button>
            </div>
        </div>
    )
}

export default Home;