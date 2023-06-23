class User{
    private idUser!: number;
    private email!: string;
    private firstName!: string;
    private lastName!: string;
    private dateOfBirth!: Date|undefined;
    private username!: string;
    private avatar!: string;

    constructor(idUser:number = -1,email:string ="",firstName:string="",lastName:string="",dateOfBirth:string = "",username:string="",avatar:string="")
    {
        this.idUser = idUser;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth===""?new Date(dateOfBirth):undefined;
        this.username = username;
        this.avatar = avatar;
    }

    public getId(){
        return this.idUser;
    }

    public setId(id : number)
    {
        this.idUser = id;
    }

    public getEmail(){
        return this.email;
    }

    public setEmail(email : string)
    {
        this.email = email;
    }

    public getFirstName(){
        return this.firstName;
    }

    public setFirstName(firstName : string)
    {
        this.firstName = firstName;
    }

    public getLastName(){
        return this.lastName;
    }

    public setLastName(lastName : string)
    {
        this.lastName = lastName;
    }

    public getDateOfBirth(){
        return this.dateOfBirth;
    }

    public setDateOfBirth(dateOfBirth : Date)
    {
        this.dateOfBirth = dateOfBirth;
    }

    public getUsername(){
        return this.username;
    }

    public setUsername(username : string)
    {
        this.username = username;
    }

    public getAvatar(){
        return this.avatar;
    }

    public setAvatar(avatar : string)
    {
        this.avatar = avatar;
    }

    public isAuth()
    {
        return this.idUser===-1;
    }


}

export default User;