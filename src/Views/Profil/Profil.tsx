import { Dispatch, SetStateAction, useState } from 'react';
import { User } from '../../Classes';
import { ResponsiveAppBar } from '../../Components';
import './Profil.css';
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Icon, IconButton, TextField, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import KeyIcon from '@mui/icons-material/Key';
import { useAuth } from '../../Utils/Hooks';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function Profil(){

    const auth = useAuth();

    const [edit, setEdit] = useState(false);
    const [user, setUser] = useState(auth());
    const [email, setEmail] = useState<string>(user.getEmail());
    const [username, setUsername] = useState<string>(user.getUsername());
    const [avatar , setAvatar] = useState<string>(user.getAvatar());
    const [firstName , setFirstName] = useState<string>(user.getFirstName());
    const [lastName , setLastName] = useState<string>(user.getLastName());
    const [password, setPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>("");
    const [open, setOpen] = useState(false);

    const regexPassword = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^\\\\&*-/]).{8,}$");

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const changePassword = ()=>{
        var check = true;
        if(newPasswordConfirm !== newPassword)
        {
            check = false;
            toast.error("Les mots de passe ne correspondent pas !",{
                theme: "colored",
            });
        }
        else{
            if(newPassword === "" && newPasswordConfirm==="")
            {
                check=false;
                toast.error("Le mot de passe ne peut être vide !",{
                    theme: "colored",
                });
            }
            else{
                if(!regexPassword.test(newPassword))
                {
                    check=false;
                    toast.error("Le mot de passe ne correspond pas aux exigences de sécurité !",{
                        theme: "colored",
                    });
                }
            }        
        }
        if(check)
        {
            axios.put("http://localhost:8080/changePassword",{
                password : password,
                newPassword : newPassword,
                idUser : user.getId()
            }).then((response)=>{
                if(response.data.status==="succes"){
                    toast.success("Le mot de passe a été modifié.",{
                        theme:"colored"
                    });
                    setPassword("");
                    setNewPassword("");
                    setNewPasswordConfirm("");
                    setOpen(false);
                }
                else{
                    toast.error(response.data.message,{theme:"colored"});
                }
            })
        }
    }

    const handleCancel = ()=>{
        setEmail(user.getEmail());
        setUsername(user.getUsername());
        setFirstName(user.getFirstName());
        setLastName(user.getLastName());
        setEdit(false);
    }

    const handleSave = ()=>{
        axios.put("http://localhost:8080/user",{
            idUser: user.getId(),
            email : email,
            username : username,
            firstName : firstName,
            lastName : lastName
        }).then((response)=>{
            if(response.data.status==="succes")
            {
                user.setEmail(email);
                user.setFirstName(firstName);
                user.setLastName(lastName);
                user.setUsername(username);
                toast.success(response.data.message);
                setEdit(false);
            }
            else{
                toast.error(response.data.message,{
                    theme:"colored"
                });
            }
            
        }).catch((error)=>{
            toast.error("Un erreur inconnu est survenue.",{
                theme:"colored"
            })
        })
    }
    

    
    return (
        <div className='ViewContainer'>
            <div className='main'>
                <Avatar alt="userAvatar" src={avatar} sx={{ width: "10rem", height: "10rem" }}></Avatar>
                <div className='form'>
                    
                    <TextField disabled={!edit} required id="email-input" label="Email" variant="outlined" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                    <TextField disabled={!edit} required id="username-input" label="Username" variant="outlined" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                    <TextField disabled={!edit} id="firstName-input" label="Prénom" variant="outlined" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}}/>
                    <TextField disabled={!edit} id="lastName-input" label="Nom" variant="outlined" value={lastName} onChange={(e)=>{setLastName(e.target.value)}}/>
                    <div className='button-container'>
                        {
                            edit? (
                                <>
                                    <IconButton onClick={handleSave} sx={{ p: 0 }}>
                                        <Tooltip title="Enregistrer">
                                            <CheckCircleOutlineIcon color="success"></CheckCircleOutlineIcon>
                                        </Tooltip>
                                    </IconButton>
                                    <IconButton onClick={handleCancel} sx={{ p: 0 }}>
                                        <Tooltip title="Annuler">
                                            <CancelIcon color="error"></CancelIcon>
                                        </Tooltip>
                                    </IconButton>
                                </>
                            ) : (
                                <>
                                    <IconButton onClick={()=>{setEdit(true)}} sx={{ p: 0 }}>
                                        <Tooltip title={"Modifier Informations"}>
                                            <EditIcon></EditIcon>
                                        </Tooltip>
                                    </IconButton>
                                    <IconButton onClick={handleClickOpen}>
                                        <Tooltip title={"Changer de mot de passe"}>
                                            <KeyIcon></KeyIcon>
                                        </Tooltip>
                                    </IconButton>
                                </>
                                
                            )
                        }
                        
                    </div>
                </div>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Modification du mot de passe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Voici un rappel des règles sur les mots de passe : 
                        <ul>
                            <li>Minimum 8 Caractères</li>
                            <li>Une majuscule</li>
                            <li>Une minuscule</li>
                            <li>Un caractère spécial (# ? ! @ $ % ^ \ & * - /)</li>
                        </ul>
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="oldPassword"
                        label="Ancien mot de passe"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={password}
                        onChange={(e)=>{setPassword(e.target.value)}}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="newPassword"
                        label="Nouveau mot de passe"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={newPassword}
                        onChange={(e)=>{setNewPassword(e.target.value)}}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="newPasswordConfirm"
                        label="Confirmer le nouveau mot de passe"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={newPasswordConfirm}
                        onChange={(e)=>{setNewPasswordConfirm(e.target.value)}}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button onClick={changePassword}>Valider</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Profil