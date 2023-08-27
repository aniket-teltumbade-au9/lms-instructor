import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppBarComponent from '../Components/AppBar';
import Product from './Products';
import React from 'react'
import Dashboard from "./Dashboard";
import AuthForm from "./Auth";
import { signInWithPopup } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import fireReact from '../Utils/firebaseConfig'
import Profile from "./Profile";
import { Skeleton } from "@mui/material";

export default function Pages() {
    const [user] = useAuthState(fireReact.auth);

    const signin = async () => {
        try {
            await signInWithPopup(fireReact.auth, fireReact.provider);
          } catch (error) {
            console.error("Error signing in with Google:", error);
          }
    }
    const register = async () => {
        try {
            await signInWithPopup(fireReact.auth, fireReact.provider);
          } catch (error) {
            console.error("Error signing in with Google:", error);
          }
    }
    
    const authenticatedRoutes = createBrowserRouter([
        {
        path: "/",
        element: <AppBarComponent />,
        children: [
            {
                index:true,
                element: <Dashboard />,
                loader: ()=>(<Skeleton />) 
            },
            { 
                path: "/products", 
                element: <Product /> 
            },
            { 
                path: "/profile", 
                element: <Profile user={user} /> ,
                loader: ()=>(<Skeleton />) 
            },
        ]
        }
    ]
    );
    const anonymousRaoutes = createBrowserRouter([
      {
        path: "/",
        element: <AuthForm type='Sign in' handler={signin} />,
        children: [
            { 
                path: "/register", 
                element: <AuthForm type='Register' handler={register} />,
                loader: ()=>(<Skeleton />) 
            },
            { 
                path: "/*", 
                loader: ()=>(<Skeleton />) 
            },
        ]
      }
    ]);
  return (
    <React.Fragment>
        <RouterProvider router={user ? authenticatedRoutes : anonymousRaoutes} />
        <h1 style={{textAlign: "right"}}>Hello CodeSandbox</h1>
    </React.Fragment>
  )
}
