import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Registration from "../pages/Registration"
import Users from "../pages/Users";
import NotFound from "../pages/NotFound"
import RequireAuth from "./RequireAuth";
import Profile from "../pages/Profile";

function Router() {
    return (
        <Routes>
            <Route path="/" element={ <Layout/> }>
                <Route index element={ <Home/> } />
                <Route path="login" element={ <Login/> } />
                <Route path="registration" element={ <Registration/> } />
                <Route path="users" 
                    element={ <RequireAuth><Users/></RequireAuth>} 
                />
                <Route path="profile" 
                    element={ <RequireAuth><Profile/></RequireAuth>} 
                />
                <Route path="*" element={ <NotFound/> } />
            </Route>    
        </Routes>
    )
}

export default Router;