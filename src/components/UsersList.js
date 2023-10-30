import React, {memo} from "react";
import UserItem from "./UserItem";
import List from '@mui/material/List';

function UsersList({users, setUsers}) {
    return(
        <List sx={{backgroundColor: "#fff"}}>
            {users.map(user => <UserItem setUsers={setUsers} user={user} key={user.name} />)} 
        </List>
    )
}

export default memo(UsersList);