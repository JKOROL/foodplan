import { useState } from 'react';
import { Instruction, Recipe, User } from '../../Classes';
import { ResponsiveAppBar } from '../../Components';
import './Recipe.css';
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Button, Card, TextField, Typography } from '@mui/material';

function RecipeView(){
    const navigate = useNavigate();
    let params = useParams();
    const [id, setId] = useState(params.id?parseInt(params.id):-1)
    const [edit,setEdit] = useState<boolean>(id===-1)
    const [label,setLabel] = useState("");
    var recipe = new Recipe();
    const [instructions,setInstructions] = useState(recipe.getInstructions());
    return (
        <div className='ViewContainer'>
            {edit?(
                <div className='formContainer'>
                    <TextField fullWidth id="label-input" label="Titre" variant="outlined" value={label} onChange={(e)=>{setLabel(e.target.value)}}/>
                    <Card>
                        <Typography textAlign="center">Ingredients</Typography>
                        {instructions.map((i,key)=>{
                            return (
                                <TextField fullWidth id="instruction-input" label={"Instruction n°"+(key+1)} variant="outlined" value={i.getContent()} onChange={(e)=>{i.setContent(e.target.value)}} margin="normal"/>
                            )
                        })}
                        <Button onClick={()=>{instructions.push(new Instruction())}}>Ajouter une instruction</Button>
                    </Card>
                    <Card>
                        <Typography textAlign="center">Instructions</Typography>
                        {instructions.map((i,key)=>{
                            return (
                                <TextField fullWidth id="instruction-input" label={"Instruction n°"+(key+1)} variant="outlined" value={i.getContent()} onChange={(e)=>{i.setContent(e.target.value)}} margin="normal"/>
                            )
                        })}
                        <Button onClick={()=>{instructions.push(new Instruction())}}>Ajouter une instruction</Button>
                    </Card>
                </div>
            ):(
                <div>
                    lecture
                </div>
            )}
        </div>
    )
}

export default RecipeView;