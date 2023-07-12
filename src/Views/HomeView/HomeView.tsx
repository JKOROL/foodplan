import { User } from '../../Classes';
import { ResponsiveAppBar } from '../../Components';
import './Home.css';
import { useNavigate } from "react-router-dom";

function HomeView(){
    const navigate = useNavigate();
    return (
        <div className='ViewContainer'>
            <p>Home</p>
        </div>
    )
}

export default HomeView