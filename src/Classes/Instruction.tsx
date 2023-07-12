class Instruction{
    private idInstruction : number;
    private content : string;
    private idRecipe : number;

    constructor(idInstruction = -1,content="",idRecipe=-1){
        this.idInstruction=idInstruction;
        this.content=content;
        this.idRecipe=idRecipe;
    }

    public getIdInstruction(){
        return this.idInstruction;
    }

    public getContent(){
        return this.content;
    }

    public getIdRecipe(){
        return this.idRecipe;
    }

    public setIdInstruction(idInstruction:number){
        this.idInstruction=idInstruction;
    }

    public setContent(content : string){
        this.content=content;
    }

    public setIdRecipe(idRecipe : number){
        this.idRecipe=idRecipe;
    }
}

export default Instruction;