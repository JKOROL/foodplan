import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { Calendar, Forum, Home, Login, Logout, Profil, Recipe, Settings, Signup } from './Views';
import { User } from './Classes';
import { useEffect, useState } from "react";
import { useAuth } from "./Utils/Hooks";
import { ToastContainer } from "react-toastify";

function App(){

    const [user,setUser]= useState(new User());
    const [connected,setConnected] = useState(false);

    const auth = useAuth();
    useEffect(()=>{
        setUser(auth());
    })

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Navigate to={"/Home"}></Navigate>,
        },{
            path: "Login",
            element: <Login setUser={setUser}></Login>,
        },{
            path: "Signup",
            element: <Signup></Signup>,
        },{
            path: "Calendar",
            element: <Calendar user={user}></Calendar>,
        },{
            path: "Recipe",
            element: <Recipe user={user}></Recipe>,
        },{
            path: "Forum",
            element: <Forum user={user}></Forum>,
        },{
            path: "Logout",
            element: <Logout user={user} setUser={setUser}></Logout>,
        },{
            path: "Settings",
            element: <Settings user={user} setUser={setUser}></Settings>,
        },{
            path: "Profil",
            element: <Profil></Profil>,
        },{
            path: "Admin",
            element: <div></div>
        },{
            path: "Home",
            element: <Home user={user}></Home>,
        },{
            path: "Recipe/create",
            element : <div>création de recette</div>
        },{
            path:"Recipe/:id",
            element : <div>recette 1</div>
        }
      ]);

    return (
        <div className="App">
            <ToastContainer limit={3}></ToastContainer>
            <RouterProvider router={router} />
        </div>
    )
}

export default App;