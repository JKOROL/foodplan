import { Button } from '@mui/material';
import { User } from '../../Classes';
import { ResponsiveAppBar } from '../../Components';
import './Recipes.css';
import { useNavigate } from "react-router-dom";




function RecipesView(){
    const navigate = useNavigate();
    return (
        <div className='ViewContainer'>
            <div className='lists'>
                <div className='list latest'>

                </div>
                <div className='list user'>

                </div>
                <div className='list best'>

                </div>
            </div>
            <div className='buttonContainer'>
                <Button onClick={()=>{navigate("/recipe/-1")}}>Créer une recette</Button>
            </div>
        </div>
    )
}

export default RecipesView