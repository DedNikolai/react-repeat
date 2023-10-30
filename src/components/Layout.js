import React, {Fragment, useEffect} from "react";
import {Outlet} from 'react-router-dom';
import Menu from "./Menu";
import {useSelector, useDispatch} from "react-redux";
import { getCurrentUser } from "../store/slice/userSlice";
import Cookies from "js-cookie";
import Loader from "./Loader";

function Layout() {
    const {userLoading} = useSelector(state => state.user);
    const dispatch = useDispatch();
    
    useEffect(() => {
        const tokenData = Cookies.get("auth-token");

        if (tokenData) {
            dispatch(getCurrentUser())
          }

    }, [])

    return (
        <Fragment>
            <Menu />
            {userLoading ? <Loader /> : <Outlet />}
        </Fragment>

    )
}

export default Layout;
