import { User } from '../../Classes';
import { ResponsiveAppBar } from '../../Components';
import './Recipe.css';
import { useNavigate } from "react-router-dom";




function Recipes(){
    const navigate = useNavigate();
    return (
        <div className='ViewContainer'>
            <p>Recipe</p>
        </div>
    )
}

export default Recipes