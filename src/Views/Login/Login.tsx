import { ResponsiveAppBar } from '../../Components';
import './Login.css';
import { useNavigate } from "react-router-dom";

function Login(){
    const navigate = useNavigate();
    return (
        <div>
            <ResponsiveAppBar userId={-1} navigate={navigate}></ResponsiveAppBar>
        </div>
    )
}

export default Login