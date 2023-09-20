import React, {useEffect, useState} from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

//code from Ania Kubow To Do App Demo

function UsersFeedback() {

    const [cookies, setCookie, removeCookie] = useCookies(null);
    const userEmail = cookies.Email;
    const authToken = cookies.AuthToken;

    const [feedback, setFeedback] = useState([]);

    //fetch feedback list
    const fetchData = () => {
        axios.get(`/feedback/${userEmail}`)
        .then((response) =>{
            console.log(response.data);
            setFeedback(response.data);
        })
        .catch((error) => {
            console.log(error)
        })
    }

    // runs fetchData on page load
    useEffect ( () => {
        if (authToken) {
            fetchData();
        }}
    , [])

    return(

        <div className ="center">

            {(feedback.length == 0)
            ? <h1>Time to enter some feedback! We haven't received any from you yet.</h1>
            : <div>
                <div className="table-header">
                    <h1>Feedback</h1>
                </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Feeling</th>
                                <th>Understanding</th>
                                <th>Support</th>
                                <th>Comments</th>
                            </tr>
                        </thead>
                        <tbody>
                            {feedback.map((feedback) => {
                                return (
                                    <tr key={feedback.id}>
                                        <td >{feedback.feeling}</td>
                                        <td >{feedback.understanding}</td>
                                        <td >{feedback.support}</td>
                                        <td>{feedback.comments}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                 </div>
            }
        </div>
    )
}

export default UsersFeedback;