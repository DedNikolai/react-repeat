import React, {useState} from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

function EditUser({data, edit, update}) {
    const [user, setIsEdit] = useState(data)

    const onChange = (e) => {
        setIsEdit({...user, name: e.target.value})
    }

    const updateUser = () => {
        edit(false);
        update({...user})
    }
            
    return(
        <>
          <TextField
            label="Data"
            value={user.name}
            onChange={onChange}
            size="small"
            fullWidth 
            sx={{marginRight: '20px'}}
          />
          <Stack direction="row" spacing={2}>
            <Button onClick={updateUser} variant="contained" color="success">Save</Button>
            <Button onClick={() => edit(false)} variant="contained" color="error">Cancel</Button>
          </Stack>  
        </>
      
    )
}

export default EditUser;