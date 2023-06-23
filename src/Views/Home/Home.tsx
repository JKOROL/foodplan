import { ResponsiveAppBar } from '../../Components';
import './Home.css';
import { useNavigate } from "react-router-dom";

function Home(){
    const navigate = useNavigate();
    return (
        <div className='ViewContainer'>
            <ResponsiveAppBar></ResponsiveAppBar>
            
        </div>
    )
}

export default Home