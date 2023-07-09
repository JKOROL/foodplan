import { User } from '../../Classes';
import { ResponsiveAppBar } from '../../Components';
import './Calendar.css';
import { useNavigate } from "react-router-dom";

type CalendarProps= {
    user : User,
}

function Calendar({user,...props}:CalendarProps){
    const navigate = useNavigate();
    return (
        <div className='ViewContainer'>
            <ResponsiveAppBar userProp={user}></ResponsiveAppBar>
            <p>Calendar</p>
        </div>
    )
}

export default Calendar