import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

function Logoff(){

    const navigate = useNavigate();

    useEffect(()=>{
        navigate("/");
    })
    return (
        <div></div>
    )
}