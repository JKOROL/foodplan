import { useState } from 'react';
import { Instruction, Recipe, User } from '../../Classes';
import { ResponsiveAppBar } from '../../Components';
import './Recipe.css';
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Button, Card, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import RecipeIngredient from '../../Classes/RecipeIngredient';
import Ingredient from '../../Classes/Ingredient';

function RecipeView(){
    const navigate = useNavigate();
    let params = useParams();
    const [id, setId] = useState(params.id?parseInt(params.id):-1)
    const [edit,setEdit] = useState<boolean>(id===-1)
    const [label,setLabel] = useState("");
    var recipe = new Recipe();
    const [instructions,setInstructions] = useState<Array<Instruction>>(recipe.getInstructions());
    const [ingredients,setIngredients] = useState<Array<RecipeIngredient>>(recipe.getIngredients());
    const [allIngredients, setAllIngredients] = useState<Array<Ingredient>>(new Array<Ingredient>());
    const [allUnits, setAllUnits] = useState<Array<string>>(["kg","g","mg","l","cl","ml","pièce(s)"]);

    const changeIngredient = (event : SelectChangeEvent,ri : RecipeIngredient) => {
        console.log(event);
    }

    return (
        <div className='ViewContainer'>
            {edit?(
                <div className='formContainer'>
                    <TextField fullWidth id="label-input" label="Titre" variant="outlined" value={label} onChange={(e)=>{setLabel(e.target.value)}}/>
                    <Card>
                        <Typography textAlign="center">Ingredients</Typography>
                        {ingredients.map((i,key)=>{
                            return (
                                <div>
                                    <Select
                                        labelId={"IngredientLabel"+key}
                                        id={"IngredientSelect"+key}
                                        value={i.getIngredient().getLabel()}
                                        label="Ingredient"
                                        onChange={(e)=>{changeIngredient(e,i)}}
                                    >
                                        {
                                            allIngredients.map((ingredient)=>{
                                                return (
                                                    <MenuItem value={ingredient.getIdIngredient()}>{ingredient.getLabel()}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                    <TextField id="outlined-number" label="Quantité" type="number" InputLabelProps={{shrink: true,}}/>
                                    <Select
                                        labelId={"UnitLabel"+key}
                                        id={"UnitSelect"+key}
                                        value={i.getUnit()}
                                        label="Unité"
                                        onChange={(e)=>{i.setUnit(e.target.value)}}
                                    >
                                        {
                                            allUnits.map((unit)=>{
                                                return (
                                                    <MenuItem value={unit}>{unit}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </div>
                                
                            )
                        })}
                        <Button onClick={()=>{ingredients.push(new RecipeIngredient(allIngredients[0],0,allUnits[0],recipe.getIdRecipe()))}}>Ajouter une instruction</Button>
                    </Card>
                    <Card>
                        <Typography textAlign="center">Instructions</Typography>
                        {instructions.map((i,key)=>{
                            return (
                                <TextField fullWidth id={"instruction-input-"+key} label={"Instruction n°"+(key+1)} variant="outlined" value={i.getContent()} onChange={(e)=>{i.setContent(e.target.value)}} margin="normal"/>
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