import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Step, StepLabel, Stepper, TextField } from '@mui/material';
import { ResponsiveAppBar } from '../../Components';
import './Signup.css';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { User } from '../../Classes';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function Signup(){
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password , setPassword] = useState<string>("");
    const [firstName , setFirstName] = useState<string>("");
    const [lastName , setLastName] = useState<string>("");
    const [confirmPassword , setConfirmPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [activeStep, setActiveStep] = useState(0);

    const regexEmail = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
    const regexPassword = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^\\\\&*-/]).{8,}$");

    const steps=["Identifiants","Infos optionnels"]

    const handleBack = () => {
        if(activeStep>0)
        {
            setActiveStep(activeStep-1);
        }
    }

    const handleNext = async() => {
        if(activeStep<steps.length-1)
        {
            if(await handleCheck())
            {
                setActiveStep(activeStep+1);
            }
        }
    }

    const handleCheck = async () =>{
        let check = true;
        
        if(activeStep===0)
        {
            if(confirmPassword !== password)
            {
                check = false;
                toast.error("Les mots de passe ne correspondent pas !",{
                    theme:"colored"
                });
            }
            else{
                if(password === "" && confirmPassword==="")
                {
                    check=false;
                    toast.error("Le mot de passe ne peut être vide !",{
                        theme:"colored"
                    });
                }
                else{
                    if(!regexPassword.test(password))
                    {
                        check=false;
                        toast.error("Le mot de passe ne correspond pas aux exigences de sécurité !",{
                            theme:"colored"
                        });
                    }
                }
                
            }
            if(username!=="")
            {
                await fetch("http://localhost:8080/checkUser/"+username
                ).then((response)=>{
                    return response.json();
                }).then((data)=>{
                    if(data.status!=="succes")
                    {
                        toast.error(data.message,{
                            theme:"colored"
                        });
                        check=false;
                    }
                })
            }
            else{
                check=false;
                toast.error("Nom d'utilisateur non valide !",{
                    theme:"colored"
                });
            }
            
            if(regexEmail.test(email))
            {
                await fetch("http://localhost:8080/checkEmail/"+email
            ).then((response)=>{
                return response.json();
            }).then((data)=>{
                if(data.status!=="succes")
                {
                    toast.error(data.message,{
                        theme:"colored"
                    });
                    check=false;
                }
            })
            }
            else{
                check=false;
                toast.error("Adresse email invalide",{
                    theme:"colored"
                });
            }
            
        }
        return check;
    }

    const handleSignup = () =>{
        let body = {
            email:email,
            username:username,
            password:password,
            firstName:firstName,
            lastName:lastName
        }
        fetch("http://localhost:8080/user",{
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
                toast.success(data.message,{
                    theme:"colored"
                });
                setInterval(()=>navigate("/Login"),5000)
            }
        })
        
    }

    return (
        <div className='ViewContainer'>
            
            <ResponsiveAppBar userProp={new User()}></ResponsiveAppBar>
            <div className='main'>
            
                <div className='form'>
                <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
                    {
                        activeStep === 0 ? (
                            <>
                            <TextField required id="email-input" label="Email" variant="outlined" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                    <TextField required id="username-input" label="Username" variant="outlined" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                    <FormControl variant="outlined" required>
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
                    <FormControl variant="outlined" required>
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
                            </>
                        ): activeStep === 1?(
                            <>
                            <TextField id="firstname-input" label="FirstName" variant="outlined" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}}/>
                            <TextField id="lastname-input" label="LastName" variant="outlined" value={lastName} onChange={(e)=>{setLastName(e.target.value)}}/>
                            </>
                        ):(
                            <></>
                        )
                    }
                    
                    <div className='buttonContainer'>
                        <Button variant="text" onClick={handleBack} disabled={activeStep===0}>Retour</Button>
                        {
                            activeStep === steps.length-1 ? (
                                <Button variant="text" onClick={handleSignup}>S'inscrire</Button>
                            ):(
                                <Button variant="text" onClick={handleNext}>Suivant</Button>
                            )
                        }
                        
                    </div>
                    
                </div>
            
            </div>
        </div>
    )
}

export default Signup