import { ResponsiveAppBar } from '../../Components';
import './Profil.css';
import { useNavigate } from "react-router-dom";

function Profil(){
    const navigate = useNavigate();
    return (
        <div className='ViewContainer'>
            <ResponsiveAppBar></ResponsiveAppBar>
            
        </div>
    )
}

export default Profil