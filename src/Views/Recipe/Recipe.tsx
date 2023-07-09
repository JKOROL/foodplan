import { User } from '../../Classes';
import { ResponsiveAppBar } from '../../Components';
import './Recipe.css';
import { useNavigate } from "react-router-dom";


type RecipeProps= {
    user : User,
}


function Recipe({user,...props}:RecipeProps){
    const navigate = useNavigate();
    return (
        <div className='ViewContainer'>
            <ResponsiveAppBar userProp={user}></ResponsiveAppBar>
            <p>Recipe</p>
        </div>
    )
}

export default Recipe