import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

function Logout(){

    const navigate = useNavigate();

    useEffect(()=>{
        sessionStorage.clear();
        localStorage.clear();
        navigate("/");
    })
    return (
        <div></div>
    )
}
export default Logout