import { useEffect, useState } from "react";
import { User } from "../../Classes";
import axios from "axios";

function useAuth(){
    return ()=>{
        var user = new User();
        var userInfo="";

        if(sessionStorage.getItem("user")!==null) {
            userInfo = sessionStorage.getItem("user") ?? "";
        } else if(localStorage.getItem("user")!==null) {
            userInfo = localStorage.getItem("user") ?? "";
        }
        if(userInfo!=="")
        {
            var infos;
            infos = JSON.parse(userInfo);
            user = new User(infos.idUser,infos.email,infos.firstName,infos.lastName,infos.username,infos.avatar);
        }
        return user;
    }
}

export default useAuth;