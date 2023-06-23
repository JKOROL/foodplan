import { ResponsiveAppBar } from '../../Components';
import './Settings.css';
import { useNavigate } from "react-router-dom";

function Settings(){
    const navigate = useNavigate();
    return (
        <div className='ViewContainer'>
            <ResponsiveAppBar></ResponsiveAppBar>
            
        </div>
    )
}

export default Settings