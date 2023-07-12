import { Dispatch, SetStateAction } from 'react';
import { User } from '../../Classes';
import { ResponsiveAppBar } from '../../Components';
import './Settings.css';
import { useNavigate } from "react-router-dom";

function SettingsView(){
    const navigate = useNavigate();
    return (
        <div className='ViewContainer'>
            <p>Settings</p>
        </div>
    )
}

export default SettingsView