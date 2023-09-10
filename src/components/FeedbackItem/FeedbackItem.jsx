import axios from "axios";

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
            <td><button onClick={handleDelete}>Delete</button></td>
        </tr>
    )
}
export default FeedbackItem;