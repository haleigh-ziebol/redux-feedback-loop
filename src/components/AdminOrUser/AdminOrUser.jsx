
import React from "react";
import { useCookies } from "react-cookie";

//child components
import UsersFeedback from '../UsersFeedback/UsersFeedback';
import Admin from '../Admin/Admin';

function AdminOrUser() {

    const [cookies, setCookie, removeCookie] = useCookies(null);
    const userEmail = cookies.Email;


    return (
        <div>
            {(userEmail == 'admin@')  // loads component based on if user is admin account 'admin@'
            ? <Admin />
            : <UsersFeedback />
            }

        </div>
    )
}

export default AdminOrUser;