import { Dispatch, SetStateAction } from 'react';
import { User } from '../../Classes';
import { ResponsiveAppBar } from '../../Components';
import './Forum.css';
import { useNavigate } from "react-router-dom";
 
function ForumView(){
    const navigate = useNavigate();
    return (
        <div className='ViewContainer'>
            <p>Forum</p>
        </div>
    )
}

export default ForumView