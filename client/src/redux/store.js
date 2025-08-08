import { configureStore } from "@reduxjs/toolkit";

import authreducer from "./authSlice"
import cartreducer from "./cartSlice"
import Profilereducer from "./profileSlice"
import courseReducer from "./courseSlice"
import viewcoursereducer from "./viewCourseSlice"  

export const store = configureStore({
    reducer: {
        auth: authreducer,
        cart: cartreducer,
        profile: Profilereducer,
        course: courseReducer,
        viewcourse: viewcoursereducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST']
            }
        })
})