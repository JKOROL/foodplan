import { ResponsiveAppBar } from '../../Components';
import './Calendar.css';
import { useNavigate } from "react-router-dom";

function Calendar(){
    const navigate = useNavigate();
    return (
        <div className='ViewContainer'>
            <ResponsiveAppBar></ResponsiveAppBar>
            
        </div>
    )
}

export default Calendar