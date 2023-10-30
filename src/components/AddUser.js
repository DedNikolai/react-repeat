import React, {useState} from "react";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function AddUser({addUser}) {
    const [name, setName] = useState('')

    const onChange = (e) => {
        setName(e.target.value);
    }

    const createUser = (e) => {
        e.preventDefault()
        addUser(prev => {
            return [...prev, {name: name}]
        })
        setName('')
    }

    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
            onSubmit={createUser}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="New User"
                inputProps={{ 'aria-label': 'add new' }}
                value={name}
                onChange={onChange} 
            />
            <IconButton onClick={createUser}  color="primary" sx={{ p: '10px' }} aria-label="directions">
                <AddCircleIcon />
            </IconButton>
          </Paper>
       
    )
}

export default AddUser;