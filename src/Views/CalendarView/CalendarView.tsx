import { User } from '../../Classes';
import { ResponsiveAppBar } from '../../Components';
import './Calendar.css';
import { useNavigate } from "react-router-dom";

function CalendarView(){
    const navigate = useNavigate();
    return (
        <div className='ViewContainer'>
            <p>Calendar</p>
        </div>
    )
}

export default CalendarView