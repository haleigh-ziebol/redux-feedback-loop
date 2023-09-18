import React, {useEffect, useState} from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

//import components
import AuthModal from "../AuthModal/AuthModal";

//code from Ania Kubow To Do App Demo

function UsersFeedback() {

    const [cookies, setCookie, removeCookie] = useCookies(null);
    const userEmail = cookies.Email;
    const authToken = cookies.AuthToken;

    const [feedback, setFeedback] = useState([]);

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
            {!authToken && <AuthModal/>}
            {authToken &&
            <div> <p>insert list here</p> </div>
            }
        </div>
    )
}

export default UsersFeedback;