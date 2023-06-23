import { useEffect, useState } from "react";
import { User } from "../../Classes";

function useAuth(){
    return ()=>{
    var user = new User(-1);
    var userInfo="";
    if(sessionStorage.getItem("user")!==null)
    {
        userInfo = sessionStorage.getItem("user") ?? "";
    }
    else if(localStorage.getItem("user")!==null)
    {
        userInfo = localStorage.getItem("user") ?? "";
    }
    if(userInfo!=="")
    {
        var userObject = JSON.parse(userInfo);
        let userStorage = new User(userObject.idUser,userObject.email,userObject.firstName,userObject.lastName,userObject.dateOfBirth,userObject.username,userObject.avatar);
        user = userStorage;
    }
    return user;
}
}

export default useAuth;