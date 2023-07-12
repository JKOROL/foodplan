import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { CalendarView, ForumView, HomeView, LoginView, LogoutView, ProfilView, RecipeView, RecipesView, SettingsView, SignupView } from './Views';
import { User } from './Classes';
import { useEffect, useState } from "react";
import { useAuth } from "./Utils/Hooks";
import { ToastContainer } from "react-toastify";
import { ResponsiveAppBar } from "./Components";

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
            element: <LoginView setUser={setUser}></LoginView>,
        },{
            path: "Signup",
            element: <SignupView></SignupView>,
        },{
            path: "Calendar",
            element: <CalendarView></CalendarView>,
        },{
            path: "Recipes",
            element: <RecipesView></RecipesView>,
        },{
            path: "Forum",
            element: <ForumView></ForumView>,
        },{
            path: "Logout",
            element: <LogoutView setUser={setUser}></LogoutView>,
        },{
            path: "Settings",
            element: <SettingsView></SettingsView>,
        },{
            path: "Profil",
            element: <ProfilView></ProfilView>,
        },{
            path: "Admin",
            element: <div></div>
        },{
            path: "Home",
            element: <HomeView></HomeView>,
        },{
            path:"Recipe/:id",
            element : <RecipeView></RecipeView>
        }
      ]);

    return (
        <div className="App">
            <ToastContainer limit={3}></ToastContainer>
            <ResponsiveAppBar></ResponsiveAppBar>
            <RouterProvider router={router} />
        </div>
    )
}

export default App;