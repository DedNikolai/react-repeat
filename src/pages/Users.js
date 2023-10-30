import React, {useEffect, useState, useRef, useMemo} from "react";
// import {useSelector, useDispatch} from "react-redux";
import { getData } from "../store/slice/dataSlice";
import UsersList from "../components/UsersList";
import Loader from "../components/Loader";
import AddUser from "../components/AddUser";
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';



function Users() {
    const [users, setUsers] = useState([])
    const [usersLoading, setUsersLoading] = useState(true)
    const [params, setParams] = useState('')
    const usersRef = useRef();
    // const dispatch = useDispatch();
    // const {users, usersLoading} = useSelector(state => state.data);
    const searchedhUsers = useMemo(() => {
        if(!params) return users
        return users.filter(user => {
            return user.name.toLowerCase().includes(params.toLowerCase())
        })
    }, [users, params])

    const onChange = (value) => {
        setParams(value);
    }    
    

    useEffect(() => {
        getData().then((res) => {
            setUsers(res.results)
            setUsersLoading(false)
        })
        // dispatch(getDataUsers())
    }, [])

    if (usersLoading) return <Loader />
    
    return (
        <Box sx={{ flexGrow: 1, padding: '0 20px', marginTop: '20px' }}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Paper
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
                            >
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Search"
                                inputProps={{ 'aria-label': 'search google maps' }}
                                value={params}
                                onChange={e => onChange(e.target.value)}
                            />
                            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                            <IconButton onClick={() => onChange('')} color="primary" sx={{ p: '10px' }} aria-label="directions">
                                <ClearIcon />
                            </IconButton>
                        </Paper>
                </Grid>
                <Grid item xs={6}>
                    <AddUser addUser={setUsers} />
                </Grid>
                <Grid item xs={12}>
                    <UsersList users={searchedhUsers} setUsers={setUsers} />
                </Grid>     
            </Grid>
        </Box>
        
    )
}

export default Users;