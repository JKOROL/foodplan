class Ingredient{
    private idIngredient : number;
    private label : string;

    constructor(idIngredient = -1,label=""){
        this.idIngredient=idIngredient;
        this.label=label;
    }

    public getIdIngredient(){
        return this.idIngredient;
    }

    public getLabel(){
        return this.label;
    }

    public setIdIngredient(idIngredient:number){
        this.idIngredient=idIngredient;
    }

    public setLabel(label : string){
        this.label=label;
    }
}

export default Ingredient;