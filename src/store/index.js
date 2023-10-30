import {configureStore} from "@reduxjs/toolkit";
import user from "./slice/userSlice";
// import data from "./slice/dataSlice";

export default configureStore({
    reducer: {
        user,
        // data
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
      }),
})