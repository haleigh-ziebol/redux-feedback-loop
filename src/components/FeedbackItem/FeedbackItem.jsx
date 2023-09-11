import { useDispatch } from "react-redux";

//mui icons
import Button from '@mui/material/Button';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Grid from '@mui/material/Unstable_Grid2';

function FeedbackItem({feedback}) {

    const dispatch = useDispatch();

    //sends info to reducer so that dialog will open 
    //and store ID for feedback to delete
    const handleDelete = () => {
        dispatch({type: 'OPEN_DIALOG'})
        dispatch({type: 'DELETE_ID', payload: feedback.id})
    }

    return(
        <tr key={feedback.id}>
            <td className={(feedback.feeling<5) ? "flagged" : "" }>{feedback.feeling}</td>
            <td className={(feedback.understanding<5) ? "flagged" : "" }>{feedback.understanding}</td>
            <td className={(feedback.support<5) ? "flagged" : "" }>{feedback.support}</td>
            <td>{feedback.comments}</td>
            <td><Button variant="text" onClick={handleDelete}><DeleteOutlinedIcon /></Button></td>
        </tr>
    )
}
export default FeedbackItem;