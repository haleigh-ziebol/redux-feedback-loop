import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

//mui icons
import Button from '@mui/material/Button';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import OutlinedFlagSharpIcon from '@mui/icons-material/OutlinedFlagSharp';

function FeedbackItem({feedback, fetchData, fetchFlagged}) {

    const dispatch = useDispatch();
    const editView = useSelector((store)=>store.editViewReducer); 


    //sends info to reducer so that dialog will open 
    //and store ID for feedback to delete
    const handleDelete = () => {
        dispatch({type: 'OPEN_DIALOG'})
        dispatch({type: 'DELETE_ID', payload: feedback.id})
    }
    const handleFlag = () => {
        let id = feedback.id
        axios.put(`/feedback/${id}`)
        .then((response) =>{
        console.log(response.data);
        fetchData();
        fetchFlagged();
        })
        .catch((error) => {
        console.log(error)
        })
    }

    return(
        <tr key={feedback.id} className={(feedback.flagged) ? "flagged" : "" }>
                    <td className={(feedback.feeling<5 && !feedback.flagged) ? "highlighted" : "" }>{feedback.feeling}</td>
                    <td className={(feedback.understanding<5 && !feedback.flagged) ? "highlighted" : "" }>{feedback.understanding}</td>
                    <td className={(feedback.support<5 ) ? "highlighted" : "" }>{feedback.support}</td>
                    <td>{feedback.comments}</td>
                    {editView && <td><Button variant="text" onClick={handleDelete}><DeleteOutlinedIcon /></Button></td>}
                    {editView && <td><Button variant="text" onClick={handleFlag}><OutlinedFlagSharpIcon /></Button></td>}
        </tr>
    )
}
export default FeedbackItem;