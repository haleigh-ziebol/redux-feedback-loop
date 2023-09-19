import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

//mui icons
import Button from '@mui/material/Button';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import OutlinedFlagSharpIcon from '@mui/icons-material/OutlinedFlagSharp';

function FeedbackItem({feedback, fetchData, fetchFlagged}) {

    const dispatch = useDispatch();

    const editView = useSelector((store)=>store.editViewReducer); 

    //sends id to reducer & opens dialog
    const handleDelete = () => {
        dispatch({type: 'OPEN_DIALOG'})
        dispatch({type: 'DELETE_ID', payload: feedback.id})
    }

    //updates flagged status
    const handleFlag = () => {
        let id = feedback.id
        axios.put(`/feedback/${id}`)
        .then((response) =>{
        console.log(response.data);
        fetchData(); //updates feedback
        fetchFlagged(); //updates notifications
        })
        .catch((error) => {
        console.log(error)
        })
    }

    return(
        <tr key={feedback.id} className={(feedback.flagged) ? "flagged" : "" }>
                    <td key='1' className={(feedback.feeling<5 && !feedback.flagged) ? "highlighted" : "" }>{feedback.feeling}</td>
                    <td key='2' className={(feedback.understanding<5 && !feedback.flagged) ? "highlighted" : "" }>{feedback.understanding}</td>
                    <td key ='3' className={(feedback.support<5 ) ? "highlighted" : "" }>{feedback.support}</td>
                    <td key ='4'>{feedback.comments}</td>
                    {editView && <td key='5'><Button variant="text" onClick={handleDelete}><DeleteOutlinedIcon /></Button></td>}
                    {editView && <td key='6'><Button variant="text" onClick={handleFlag}><OutlinedFlagSharpIcon /></Button></td>}
        </tr>
    )
    
}
export default FeedbackItem;