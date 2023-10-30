import React from "react";
import {useSelector} from "react-redux"
import { useLocation, Navigate } from "react-router-dom";

function RequireAuth({children}) {
    const location = useLocation();
    const user = useSelector(state => state.user.user)
    const url = new URLSearchParams();
    url.set("redirect", location.pathname + location.search);

    return !user ? <Navigate 
                    to={{
                        pathname: "/login",
                        search: url.toString(),
                      }} state={{from: location}}/> : children

}

export default RequireAuth;