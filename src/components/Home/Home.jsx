import React from 'react';
import {useHistory} from 'react-router-dom';

function Home(){
    const history=useHistory();
    return(
        <div>
            <header className='App-header'>
                <h1 className='App-title'>Feedback!</h1>
                <h4>Don't forget it!</h4>
            </header>
            <div>
                <button onClick={()=>history.push('/feeling')}>Submit Feedback </button>
            </div>
        </div>
    )
}

export default Home;