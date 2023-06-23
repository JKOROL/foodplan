import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { ResponsiveAppBar } from '../../Components';
import './Signup.css';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { User } from '../../Classes';
import { ToastContainer, toast } from 'react-toastify';

function Signup(){
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password , setPassword] = useState<string>("");
    const [confirmPassword , setConfirmPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleSignup = () =>{
        let body = {
            email:email,
            username:username,
            password:password,
        }

        if(password===confirmPassword)
        {
            fetch("http://localhost:8080/user",{
                method : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body : JSON.stringify(body),
            }).then((response)=>{
                return response.json();
            }).then((data)=>{
                if(data.status=="succes")
                {
                    toast.success(data.message);
                    setInterval(()=>navigate("/"),1000)
                }
            })
            /*sessionStorage.setItem("user",JSON.stringify(new User(2)));
            */
        }
        else{
            //TODO : Toast à ajouter.
        }
        
    }

    return (
        <div className='ViewContainer'>
            <ToastContainer></ToastContainer>
            <ResponsiveAppBar></ResponsiveAppBar>
            <div className='main'>
                <div className='form'>
                    <TextField id="email-input" label="Email" variant="outlined" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                    <TextField id="username-input" label="Username" variant="outlined" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Mot de passe</InputLabel>
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
                            label="Mot de passe"
                            value={password}
                            onChange={(e)=>{setPassword(e.target.value)}}
                            
                        />
                    </FormControl>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Confirmation Mot de passe</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-confirm-password"
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
                            label="Confirmation Mot de passe"
                            value={confirmPassword}
                            onChange={(e)=>{setConfirmPassword(e.target.value)}}
                        />
                    </FormControl>
                    <div className='buttonContainer'>
                        <Button variant="text" onClick={handleSignup}>S'inscrire</Button>
                    </div>
                    
                </div>
            
            </div>
        </div>
    )
}

export default Signup