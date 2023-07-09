import { User } from '../../Classes';
import { ResponsiveAppBar } from '../../Components';
import './Home.css';
import { useNavigate } from "react-router-dom";

type HomeProps= {
    user : User,
} 

function Home({user,...props}:HomeProps){
    const navigate = useNavigate();
    console.log(user.getId());
    console.log(user.isAuth());
    console.log(user);
    return (
        <div className='ViewContainer'>
            <ResponsiveAppBar userProp={user}></ResponsiveAppBar>
            <p>Home</p>
        </div>
    )
}

export default Home