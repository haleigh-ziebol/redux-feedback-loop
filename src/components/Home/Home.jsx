import React from 'react';
import {useHistory} from 'react-router-dom';

function Home(){
    const history=useHistory();
    return(
        <div>
            <button onClick={()=>history.push('/feeling')}>Submit Feedback </button>
        </div>
    )
}

export default Home;