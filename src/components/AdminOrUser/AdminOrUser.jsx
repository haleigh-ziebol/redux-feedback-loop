
import React, { useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";

import UsersFeedback from '../UsersFeedback/UsersFeedback';
import Admin from '../Admin/Admin';

function AdminOrUser() {

    const [cookies, setCookie, removeCookie] = useCookies(null);
    const userEmail = cookies.Email;

    //flagged
    const flaggedCount = useSelector((store)=>store.flaggedNotificationReducer)
    const dispatch = useDispatch();
    console.log(cookies)

    //fetch notification number for flagged feedback
    const fetchFlagged= () => {
        axios.get('/flagged')
        .then((response) =>{
        dispatch({type:'UPDATE_FLAGGED', payload: response.data.count});
        })
        .catch((error) => {
        console.log(error)
        })
    } /// end fetchFlagged

    //runs fetchFlagged
    useEffect(() => {
        fetchFlagged()
    }, [cookies]) //end flagged


    return (
        <div>
            {(userEmail == 'admin@') 
            ? <Admin />
            : <UsersFeedback />
            }

        </div>
    )
}

export default AdminOrUser;