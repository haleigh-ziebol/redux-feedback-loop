import axios from "axios";
import Button from '@mui/material/Button';

function FeedbackItem({feedback, fetchData}) {

    //delete feedback
    const handleDelete = () => {
        let id = feedback.id
        axios.delete(`/feedback/${id}`)
        .then((response) =>{
        console.log(response.data);
        fetchData();
        })
        .catch((error) => {
        console.log(error)
        })
    }

    return(
        <tr key={feedback.id}>
            <td>{feedback.feeling}</td>
            <td>{feedback.understanding}</td>
            <td>{feedback.support}</td>
            <td>{feedback.comments}</td>
            <td><Button variant="text" onClick={handleDelete}>Delete</Button></td>
        </tr>
    )
}
export default FeedbackItem;