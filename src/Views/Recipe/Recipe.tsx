import { ResponsiveAppBar } from '../../Components';
import './Recipe.css';
import { useNavigate } from "react-router-dom";

function Recipe(){
    const navigate = useNavigate();
    return (
        <div className='ViewContainer'>
            <ResponsiveAppBar></ResponsiveAppBar>
            
        </div>
    )
}

export default Recipe