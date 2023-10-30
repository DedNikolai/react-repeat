import React from "react";
import { Container, Grid, CircularProgress} from '@mui/material';


function Loader() {
    return(
        <Container maxWidth="md" sx={{display: 'flex', height: '90vh'}}>
            <Grid container spacing={3} alignItems="center" justifyContent="center">
                <Grid item>
                    <CircularProgress color="inherit" />
                </Grid>
            </Grid>
        </Container> 

        // <h1>Loading.....</h1>
    )
}

export default Loader;