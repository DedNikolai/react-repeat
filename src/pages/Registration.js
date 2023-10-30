import React, {useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {NavLink} from 'react-router-dom';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import {useSelector, useDispatch} from "react-redux";
import { rgistration, claerStatus } from "../store/slice/userSlice";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader"

const schema = yup.object({
    email: yup.string().email('Invalid Email').required('Please input email'),
    password: yup.string().required('Please input password').min(6, 'To short').max(20, 'To long'),
    firstName: yup.string().required('Please input firstName').min(2, 'To short').max(20, 'To long'),
    lastName: yup.string().required('Please input lastName').min(2, 'To short').max(20, 'To long')
}).required();

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Rgestration() {
  const {user, authStatus} = useSelector(state => state.user)
  const dispatch = useDispatch();
  const userAuth = (data) => dispatch(rgistration(data));
  const clear = () => dispatch(claerStatus())
  const {register, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: yupResolver(schema),
        mode: 'onBlur'
    });  
 
    const onSubmit = (data) => {
      userAuth(data);
      reset();
  };

  useEffect(() => {
    return () => dispatch(claerStatus())
  }, [])

  if (user) return <Navigate to={`/`} />
  if (authStatus === 'panding') return <Loader />
  if (authStatus === 'fulfilled') return <Navigate to={`/login`} />

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
            Sign up
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
              <Grid item xs={12}>
                <TextField
                  {...register("email")}
                  required
                  fullWidth
                  id="email"
                  label={errors.email?.message || "Email Address"}
                  autoComplete="email"
                  error={errors.hasOwnProperty('email')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("password")}
                  required
                  fullWidth
                  label={errors.password?.message ||"Password"}
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={errors.hasOwnProperty('password')}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={NavLink} to={'/login'} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}