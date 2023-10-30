import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import {NavLink} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useSelector, useDispatch} from "react-redux";
import { logIn } from "../store/slice/userSlice";

const schema = yup.object({
    email: yup.string().email('Invalid Email').required('Please input email'),
    password: yup.string().required(),
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

export default function Login() {
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || '/';
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch();
  
  // const userLogIn = (data) => dispatch(signIn(data))
   const userLogIn = (data) => dispatch(logIn(data))
  
  const {register, handleSubmit, formState: {errors}, reset} = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur'
});

  if (user) return <Navigate to={`${fromPage}`} />  
  
  const onSubmit = (data) => {
    userLogIn(data);
    reset();
  };

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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
            <TextField
              {...register("email")}
              margin="normal"
              required
              fullWidth
              id="email"
              label={errors.email?.message || "Email Address"}
              autoComplete="email"
              autoFocus
              error={errors.hasOwnProperty('email')}
            />
            <TextField
             {...register("password")}
              margin="normal"
              required
              fullWidth
              label={errors.password?.message ||"Password"}
              type="password"
              id="password"
              autoComplete="current-password"
              error={errors.hasOwnProperty('password')}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link component={NavLink} to="/registration" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}