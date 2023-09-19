
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
    const dispatch = useDispatch();
    console.log(cookies)


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