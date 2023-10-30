import React, {useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import {useSelector, useDispatch} from "react-redux";
import { updateUser } from "../store/slice/userSlice";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader"

const schema = yup.object({
    firstName: yup.string().required('Please input firstName').min(2, 'To short').max(20, 'To long'),
    lastName: yup.string().required('Please input lastName').min(2, 'To short').max(20, 'To long')
}).required();

const defaultTheme = createTheme();

export default function Profile() {
  const {user, authStatus} = useSelector(state => state.user)
  const dispatch = useDispatch();
  const updateData = (data) => dispatch(updateUser(data));
  
  const {register, handleSubmit, formState: {errors}, reset} = useForm({
        defaultValues: {...user},
        resolver: yupResolver(schema),
        mode: 'onBlur'
    });  
 
    const onSubmit = (data) => {
      updateData(data);

  };

  useEffect(() => {
    if(user) {
        reset(user)
    }
  }, [user])
 
  if (authStatus === 'pending') return <Loader />

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Prifile
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("firstName")}
                  autoComplete="given-name"
                  required
                  fullWidth
                  id="firstName"
                  label={errors?.firstName?.message || "First Name"}
                  autoFocus
                  error={errors.hasOwnProperty('firstName')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("lastName")}
                  required
                  fullWidth
                  id="lastName"
                  label={errors?.lastName?.message || "Last Name"}
                  name="lastName"
                  autoComplete="family-name"
                  error={errors.hasOwnProperty('lastName')}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}