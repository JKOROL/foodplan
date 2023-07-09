import { Button, Checkbox, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { ResponsiveAppBar } from '../../Components';
import './Login.css';
import { useNavigate, redirect } from "react-router-dom";
import { Dispatch, SetStateAction, useState } from 'react';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { User } from '../../Classes';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

type LoginProps = {
    setUser : Dispatch<SetStateAction<User>>
}

function Login({setUser,...props} : LoginProps){
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("")
    const [password , setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [stayConnected, setStayConnected] = useState<boolean>(false);

    const handleConnection = () =>{
        let body = {
            email : email,
            password : password,
            stayConnected : stayConnected
        }
        fetch("http://localhost:8080/login",{
            method : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify(body),
        }).then((response)=>{
                return response.json();
        }).then((data)=>{
            if(data.status==="succes")
            {
                var user = new User(data.user.idUser,data.user.email,data.user.firstName,data.user.lastName,data.user.username,data.user.avatar);
                toast.success(data.message);
                setUser(user);
                if(stayConnected)
                {
                    localStorage.setItem("token",data.token);
                    localStorage.setItem("user",JSON.stringify(user));
                }
                else{
                    sessionStorage.setItem("token",data.token);
                    sessionStorage.setItem("user",JSON.stringify(user));
                }
                setInterval(()=>navigate("/Home",{ replace: true }),5000);
            }
            else{
                toast.error(data.message,{
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
            }
        })
        .catch((error)=>{
            toast.error("Une erreur est survenue !");
            console.log(error);
        })
    }

    return (
        <div className='ViewContainer'>
            <ResponsiveAppBar userProp={new User()}></ResponsiveAppBar>
            <div className='main'>
                <div className='form'>
                    <TextField id="email-input" label="Email" variant="outlined" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={()=>{setShowPassword(!showPassword)}}
                                        onMouseDown={()=>{setShowPassword(!showPassword)}}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                            value={password}
                            onChange={(e)=>{setPassword(e.target.value)}}
                        />
                        <FormControlLabel control={<Checkbox value={stayConnected} onChange={(e)=>{setStayConnected(e.target.checked)}} />} label="Se souvenir de moi" />
                    </FormControl>
                    <div className='buttonContainer'>
                        <Button variant="text" onClick={handleConnection}>Connexion</Button>
                        <Button variant="text" onClick={()=>navigate("/Signup")}>S'inscrire</Button>
                    </div>
                    
                </div>
            
            </div>
        </div>
    )
}

export default Login