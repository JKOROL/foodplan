import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { ResponsiveAppBar } from '../../Components';
import './Login.css';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { User } from '../../Classes';

function Login(){
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("")
    const [password , setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleConnection = () =>{
        console.log(email,password);
        sessionStorage.setItem("user",JSON.stringify(new User(2)));
        navigate("/");
    }

    return (
        <div className='ViewContainer'>
            <ResponsiveAppBar></ResponsiveAppBar>
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