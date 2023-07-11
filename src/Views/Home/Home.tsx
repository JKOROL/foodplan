import { User } from '../../Classes';
import { ResponsiveAppBar } from '../../Components';
import './Home.css';
import { useNavigate } from "react-router-dom";

type HomeProps= {
    user : User,
} 

function Home({user,...props}:HomeProps){
    const navigate = useNavigate();
    return (
        <div className='ViewContainer'>
            <p>Home</p>
        </div>
    )
}

export default Home