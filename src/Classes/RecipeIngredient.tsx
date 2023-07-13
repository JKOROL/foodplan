import Ingredient from "./Ingredient";

class RecipeIngredient{

    private ingredient : Ingredient;
    private quantity : number;
    private unit : string;
    private idRecipe : number;

    constructor(ingredient:Ingredient,quantity : number, unit : string, idRecipe : number){
        this.ingredient = ingredient;
        this.quantity = quantity;
        this.unit = unit;
        this.idRecipe = idRecipe;
    }

    public setIngredient(ingredient : Ingredient){
        this.ingredient = ingredient;
    }

    public setQuantity(quantity : number){
        this.quantity = quantity;
    }

    public setUnit(unit : string){
        this.unit = unit;
    }

    public setIdRecipe(idRecipe : number){
        this.idRecipe = idRecipe;
    }

    public getIngredient(){
        return this.ingredient;
    }

    public getQuantity(){
        return this.quantity;
    }

    public getUnit(){
        return this.unit;
    }

    public getIdRecipe(){
        return this.idRecipe;
    }

}

export default RecipeIngredient;