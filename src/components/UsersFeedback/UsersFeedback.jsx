import React, {useEffect, useState} from "react";
import axios from "axios";

//import components
import Auth from '../Auth/Auth';

//code from Ania Kubow To Do App Demo

function UsersFeedback() {

    const userEmail = 'test@test.com';
    const [feedback, setFeedback] = useState([]);

    const authToken = true;

    const feedbackList = async () => {
        try {
            const response = await axios.get(`userfeedback/${userEmail}`);
            const json = await response.json();
        } catch (err) {
            console.error(err);
        }
    }
    useEffect ( () => {
        if (authToken) {
            feedbackList()
        }}
        , [])

    return(

        <div>
            {!authToken && <Auth/>}
            {authToken &&
            <div> <p>insert list here</p> </div>
            }
        </div>
    )
}

export default UsersFeedback;