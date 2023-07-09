import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Calendar, Forum, Home, Login, Logout, Profil, Recipe, Settings, Signup } from './Views';
import { User } from './Classes';
import { useEffect, useState } from "react";
import { useAuth } from "./Utils/Hooks";

function App(){

    const [user,setUser]= useState(new User());
    const [connected,setConnected] = useState(false);

    
    //setUser(useAuth());
    const auth = useAuth();
    useEffect(()=>{
        setUser(auth());
    })

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home user={user}></Home>,
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
            element: <Profil user={user} setUser={setUser}></Profil>,
        },{
            path: "Admin",
            element: <div></div>
        }
      ]);

    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    )
}

export default App;