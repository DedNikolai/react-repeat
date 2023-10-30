import React, {useState} from "react";
import EditUser from "./EditUser";
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';

function UserItem({user, setUsers}) {
    const [isEdit, setIsEdit] = useState(false)
    const [data, setData] = useState(user)

    const onCheck = (e) => {
        setData(prev => {
            return {...prev, isCheked: e.target.checked}
        })
    }

    const deleteUser = () => {
        setUsers(prev => {
            const users = prev.filter(item => item.name !=data.name)
            return users;
        })
    }

    return(
        <ListItem>
            <Checkbox 
                checked={data?.isCheked || false}
                onChange={onCheck}
            />
            {!isEdit ?
                <>
                    <ListItemText
                        primary={data.name}
                        className={data?.isCheked ? 'isCheked' : ''}
                    />
                    <Stack direction="row" spacing={2}>
                        <Button onClick={() => setIsEdit(true)} variant="contained" color="secondary">Edit</Button>
                        <Button onClick={deleteUser} variant="contained" color="error">Delete</Button>
                    </Stack>
                </>
                :
                <EditUser update={setData} data={data} edit={setIsEdit} />
            }          
         </ListItem> 
    )
}

export default UserItem;