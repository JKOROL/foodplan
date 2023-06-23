import { ResponsiveAppBar } from '../../Components';
import './Forum.css';
import { useNavigate } from "react-router-dom";

function Forum(){
    const navigate = useNavigate();
    return (
        <div className='ViewContainer'>
            <ResponsiveAppBar></ResponsiveAppBar>
            
        </div>
    )
}

export default Forum