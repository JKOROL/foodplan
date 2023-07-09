import { Dispatch, SetStateAction } from 'react';
import { User } from '../../Classes';
import { ResponsiveAppBar } from '../../Components';
import './Settings.css';
import { useNavigate } from "react-router-dom";


type SettingsProps= {
    user : User,
    setUser: Dispatch<SetStateAction<User>>
} 


function Settings({user,setUser,...props}:SettingsProps){
    const navigate = useNavigate();
    return (
        <div className='ViewContainer'>
            <ResponsiveAppBar userProp={user}></ResponsiveAppBar>
            <p>Settings</p>
        </div>
    )
}

export default Settings