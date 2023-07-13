import { useEffect, useState } from 'react';
import { Instruction, Recipe, User } from '../../Classes';
import { ResponsiveAppBar } from '../../Components';
import './Recipe.css';
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import RecipeIngredient from '../../Classes/RecipeIngredient';
import Ingredient from '../../Classes/Ingredient';
import axios, { all } from 'axios';
import { toast } from 'react-toastify';

function RecipeView(){
    const navigate = useNavigate();
    let params = useParams();
    const [id, setId] = useState(params.id?parseInt(params.id):-1)
    const [edit,setEdit] = useState<boolean>(id===-1)
    const [label,setLabel] = useState("");
    var recipe = new Recipe();
    const [instructions,setInstructions] = useState<Array<Instruction>>(recipe.getInstructions());
    const [ingredients,setIngredients] = useState<Array<RecipeIngredient>>(recipe.getIngredients());
    const [allIngredients, setAllIngredients] = useState<Array<Ingredient>>([]);
    const [allUnits, setAllUnits] = useState<Array<string>>(["kg","g","mg","l","cl","ml","pièce(s)"]);
    const [newIngredient, setNewIngredient] = useState("");
    const [open, setOpen] = useState(false);

    const changeIngredient = (event : SelectChangeEvent<number>,ri : RecipeIngredient) => {
        if(event.target.value===-1){
            setOpen(true);
        }else{
            ri.setIngredient(allIngredients.filter((i)=>{return i.getIdIngredient()===event.target.value})[0]);
        }
    }
    
    const handleClose = () => {
        setOpen(false);
        setIngredients(ingredients.filter((i)=>{return i.getIngredient().getIdIngredient()!==-1}));
    }

    const createIngredient = () =>{
        if(newIngredient!=="")
        {
            axios.post("http://localhost:8080/ingredient",{ingredient:newIngredient.charAt(0).toUpperCase() + newIngredient.slice(1).toLowerCase()}).then((response)=>{
                allIngredients.push(new Ingredient(response.data.id,response.data.label));
                handleClose();
                setNewIngredient("");
            })
        }
        else{
            toast.error("Le nom de l'ingredient ne peut être vide !",{theme:"colored"});
        }
    }

    const addIngredient = () => {
        var aviableI = aviableIngredients();
        if(aviableI.length===0){
            setOpen(true);
        }
        ingredients.push(new RecipeIngredient(aviableI[0]??new Ingredient(),0,allUnits[0],recipe.getIdRecipe()))
    }

    const aviableIngredients = () =>{
        var idUsed = ingredients.map((i)=>{return i.getIngredient().getIdIngredient()})
        
        return allIngredients.filter((i)=>{return !idUsed.includes(i.getIdIngredient())});
    }

    const filtrerIngredients = (ingredient : Ingredient, ri : RecipeIngredient) => {
        var idUsed = ingredients.map((i)=>{return i.getIngredient().getIdIngredient()});
        return !idUsed.includes(ingredient.getIdIngredient()) || ri.getIngredient().getIdIngredient()===ingredient.getIdIngredient();
    }

    useEffect(()=>{
        axios.get("http://localhost:8080/ingredient").then((response)=>{
            let dbIngredients = new Array<Ingredient>();
            response.data.map((ingredient: any)=>{
                console.log(ingredient);
                dbIngredients.push(new Ingredient(ingredient.idIngredient,ingredient.label));
            })
            setAllIngredients(dbIngredients);
        })
    },[])

    return (
        <div className='ViewContainer'>
            {edit?(
                <div className='formContainer'>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Création d'un ingredient</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="newIngredientInput"
                                label="Nom de l'ingredient"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={newIngredient}
                                onChange={(e)=>{setNewIngredient(e.target.value)}}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Annuler</Button>
                            <Button onClick={createIngredient}>Valider</Button>
                        </DialogActions>
                    </Dialog>
                    <TextField fullWidth id="label-input" label="Titre" variant="outlined" value={label} onChange={(e)=>{setLabel(e.target.value)}}/>
                    <Card>
                        <Typography textAlign="center">Ingredients</Typography>
                        {ingredients.map((i,key)=>{
                            return (
                                <div className='ingredientInput'>
                                    <FormControl className='IngredientSelect'>
                                        <InputLabel>Ingredient</InputLabel>
                                        <Select
                                        labelId={"IngredientLabel"+key}
                                        id={"IngredientSelect"+key}
                                        
                                        value={i.getIngredient().getIdIngredient()}
                                        label="Ingredient"
                                        onChange={(e)=>{changeIngredient(e,i)}}
                                    >
                                        {
                                            allIngredients.filter((ing)=>{return filtrerIngredients(ing,i)}).map((ingredient)=>{
                                                return (
                                                    <MenuItem value={ingredient.getIdIngredient()}>{ingredient.getLabel()}</MenuItem>
                                                )
                                            })
                                        }
                                        <MenuItem value={-1}>Créer un ingredient</MenuItem>
                                    </Select>
                                    </FormControl>
                                    <TextField id={"quantityInput"+key} className='QuantityInput' label="Quantité" type="number" value={i.getQuantity()} onChange={(e)=>{i.setQuantity(parseInt(e.target.value))}}/>
                                    <FormControl className='UnitSelect'>
                                        <InputLabel>Unité</InputLabel>
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
                                    </FormControl>
                                </div>
                                
                            )
                        })}
                        <Button onClick={addIngredient}>Ajouter un ingredient</Button>
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