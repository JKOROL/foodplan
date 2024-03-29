import Instruction from "./Instruction";
import RecipeIngredient from "./RecipeIngredient";

class Recipe{
    private idUser:number;
    private idRecipe : number;
    private label : string;
    private instructions : Array<Instruction>;
    private ingredients : Array<RecipeIngredient>;

    constructor(idUser = -1,idRecipe = -1,label = "",instructions = new Array<Instruction>(),ingredients = new Array<RecipeIngredient>() ) {
        this.idRecipe=idRecipe;
        this.idUser=idUser;
        this.label=label;
        this.instructions=instructions;
        this.ingredients=ingredients;
    }

    public getIdUser(){
        return this.idUser;
    }

    public getIdRecipe(){
        return this.idRecipe;
    }

    public getLabel(){
        return this.label;
    }

    public getInstructions(){
        return this.instructions;
    }

    public getIngredients(){
        return this.ingredients;
    }

    public setIdUser(idUser : number){
        this.idUser=idUser;
    }

    public setIdRecipe(idRecipe : number){
        this.idRecipe=idRecipe;
    }

    public setLabel(label : string){
        this.label=label;
    }

    public setInstructions(instructions : Array<Instruction>){
        this.instructions=instructions;
    }

    public setIngredients(ingredients : Array<RecipeIngredient>){
        this.ingredients=ingredients;
    }
}

export default Recipe;