import { Dispatch, SetStateAction } from 'react';
import { User } from '../../Classes';
import { ResponsiveAppBar } from '../../Components';
import './Forum.css';
import { useNavigate } from "react-router-dom";

type ForumProps= {
    user : User,
} 

function Forum({user,...props}:ForumProps){
    const navigate = useNavigate();
    return (
        <div className='ViewContainer'>
            <p>Forum</p>
        </div>
    )
}

export default Forum