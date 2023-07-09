import { Dispatch, SetStateAction } from 'react';
import { User } from '../../Classes';
import { ResponsiveAppBar } from '../../Components';
import './Profil.css';
import { useNavigate } from "react-router-dom";

type ProfilProps= {
    user : User,
    setUser: Dispatch<SetStateAction<User>>
} 

function Profil({user,setUser,...props}:ProfilProps){
    const navigate = useNavigate();
    return (
        <div className='ViewContainer'>
            <ResponsiveAppBar userProp={user}></ResponsiveAppBar>
            <p>Profil</p>
        </div>
    )
}

export default Profil