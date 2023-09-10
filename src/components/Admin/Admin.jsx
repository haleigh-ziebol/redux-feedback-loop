import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import FeedbackItem from '../FeedbackItem/FeedbackItem.jsx'

function Admin(){
    const axios = Axios;
    const [feedbackList, setFeedbackList] = useState([])
    const [updateData, setUpdateDate] = useState(0)
    
    //fetch feedback list
    const fetchData = () => {
        axios.get('/feedbacklist')
        .then((response) =>{
        console.log(response.data);
        setFeedbackList(response.data);
        })
        .catch((error) => {
        console.log(error)
        })
    }

    //runs fetchData
    useEffect(() => {
        fetchData(); //run when page loads
    }, [])

    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Feeling</th>
                        <th>Understanding</th>
                        <th>Support</th>
                        <th>Comments</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {feedbackList.map((feedback) => {
                         return (
                             <FeedbackItem feedback={feedback} fetchData={fetchData}/>
                        )
                    })}
                </tbody>
            </table>

        </div>
    )
}

export default Admin;