import { Dispatch, SetStateAction, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { User } from "../../Classes";

type LogoutProps= {
    setUser: Dispatch<SetStateAction<User>>
} 

function LogoutView({setUser,...props}:LogoutProps){

    const navigate = useNavigate();

    useEffect(()=>{
        setUser(new User());
        sessionStorage.clear();
        localStorage.clear();
        navigate("/");
    })
    return (
        <div></div>
    )
}
export default LogoutView