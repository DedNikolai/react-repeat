import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../services/api";
import Cookies from "js-cookie";

export const getCurrentUser = createAsyncThunk(
    "user/getCurrentUser",
    async function(_, {rejectWithValue, dispatch, getState}) {
        try {
            const response = await api.get("/auth/me")
            
            if (response.status !== 200) {
                throw new Error("Server error")
            }

            return response;
        } catch (error) {
            console.log(error)
            return rejectWithValue(error)
        }
        
    }
)

export const logIn = createAsyncThunk(
    "user/logIn",
    async function(data, {rejectWithValue, dispatch, getState}) {
        try {
            const response = await api.post("/auth/email/login", data)
            
            if (response.status !== 200) {
                throw new Error(response.errors)
            }

            return response;

        } catch (error) {
            console.log(error)
            return rejectWithValue(error)
        }
        
    }
)

export const logOut = createAsyncThunk(
    "user/logOut",
    async function(data, {rejectWithValue, dispatch, getState}) {
        try {
            const response = await api.post("/auth/logOut")
            
            if (response.status < 200 || response.status >= 300) {
                throw new Error(response.errors)
            }
            dispatch(signOut())
            return response;

        } catch (error) {
            console.log(error)
            return rejectWithValue(error)
        }
        
    }
)

export const updateUser = createAsyncThunk(
    "user/updateUser",
    async function(data, {rejectWithValue, dispatch, getState}) {
        try {
            const response = await api.patch("/auth/me", data)
            
            if (response.status < 200 ||  response.status >= 300) {
                throw new Error(response)
            }

            return response;

        } catch (error) {
            console.log(error)
            return rejectWithValue(error)
        }
        
    }
)

export const rgistration = createAsyncThunk(
    "user/rgistration",
    async function(data, {rejectWithValue, dispatch, getState}) {
        try {
            const response = await api.post("/auth/email/register", data)
            
            if (response.status < 200 ||  response.status >= 300) {
                throw new Error(response.errors)
            }

            return response;

        } catch (error) {
            console.log(error)
            return rejectWithValue(error)
        }
        
    }
)

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        userLoading: false,
        authStatus: ''
    },

    reducers: {
        
        signOut(state, action) {
            state.user = null;
            Cookies.remove("auth-token");
        },

        claerStatus(state) {
            state.authStatus = '';
        },

    },

    extraReducers: (builder) => {
        builder
            .addCase(getCurrentUser.pending, (state) => {
                state.userLoading = true;
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.userLoading = false;
                state.user = action.payload.data;
            })
            .addCase(getCurrentUser.rejected, (state, action) => {
            state.userLoading = false;
            })
            .addCase(logIn.pending, (state) => {
                state.userLoading = true;
            })
            .addCase(logIn.fulfilled, (state, action) => {
                state.userLoading = false;
                state.user = action.payload.data.user;
                
                Cookies.set("auth-token", action.payload.data.token, { expires: 1 });
            })
            .addCase(logIn.rejected, (state, action) => {
            state.userLoading = false;
            })
            .addCase(rgistration.pending, (state) => {
                state.authStatus = 'panding';
            })
            .addCase(rgistration.fulfilled, (state, action) => {
                state.authStatus = 'fulfilled';
            })
            .addCase(rgistration.rejected, (state, action) => {
            state.authStatus = 'rejected';
            console.log(action.payload)
            })
            .addCase(updateUser.pending, (state) => {
                state.authStatus = 'pending';
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.authStatus = 'fulfilled';
                state.user = action.payload.data
            })
            .addCase(updateUser.rejected, (state, action) => {
            state.authStatus = 'rejected';
            console.log(action.payload)
            })
            .addCase(logOut.pending, (state) => {
                state.userLoading = true;
            })
            .addCase(logOut.fulfilled, (state) => {
                state.userLoading = false;
            })
            .addCase(logOut.rejected, (state) => {
            state.userLoading = false;
            })

    }
})

export const {signOut, claerStatus} = userSlice.actions;

export default userSlice.reducer;