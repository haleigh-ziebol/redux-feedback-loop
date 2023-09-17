import React from 'react';
import {useHistory} from 'react-router-dom';
import { useCookies } from 'react-cookie';

//MUI components
import Button from '@mui/material/Button'

function Home(){

    const handleSubmit = () => {
        if (cookies) {
            history.push('/feeling')
        }
        else {
            history.push('/entersite')
        }
    }
    
    const [cookies, setCookie, removeCookie] = useCookies(null);
    const history = useHistory();
    

    return(
        <div>
            <div>
                <h1>Help us help you!</h1>
                <h3>Your feedback informs our teaching! We want you to succeed!</h3>
            </div>
            <br/>
            <div>
                <Button variant="contained" onClick={handleSubmit}>Submit Feedback </Button>
            </div>
        </div>
    )
}

export default Home;