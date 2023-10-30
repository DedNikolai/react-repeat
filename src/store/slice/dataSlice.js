// import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

// export const getDataUsers = createAsyncThunk(
//     "data/getDataUsers",
//     async function(_, {rejectWithValue, dispatch, getState}) {
//         try {
//             const response = await fetch('https://swapi.dev/api/people/');
            
//             if (!response.ok) {
//                 throw new Error("Server error")
//             }

//             const data = await response.json(); 

//             return data;
//         } catch (error) {
            
//             return rejectWithValue(error.message)
//         }
        
//     }
// )

// const dataSlice = createSlice({
//     name: "data",
//     initialState: {
//         users: [],
//         usersLoading: true
//     },
//     reducers: {
            
//         },
    
//     extraReducers: (builder) => {
//         builder
//             .addCase(getDataUsers.pending, (state) => {
//                 state.usersLoading = true;
//             })
//             .addCase(getDataUsers.fulfilled, (state, action) => {
//                 state.usersLoading = false;
//                 state.users = action.payload.results;
//             })
//             .addCase(getDataUsers.rejected, (state, action) => {
//             state.usersLoading = false;
//             console.log(action.payload)
//         })

//     }
//     }
// )

// export default dataSlice.reducer;

export const getData = async () => {
    try {
        const response = await fetch('https://swapi.dev/api/people/');
        
        if (!response.ok) {
            throw new Error(response)
        }

        const data = await response.json(); 

        return data;
    } catch (error) {
        console.log(error)
    }
}