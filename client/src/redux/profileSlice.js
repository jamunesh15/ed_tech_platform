import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null, 
    loading: false
};

const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload; 
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        setToken(state, action) {
            state.token = action.payload;
            localStorage.setItem("token", JSON.stringify(action.payload));
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        logout(state) {
            state.token = null;
            state.user = null;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
    },
});

export const { setLoading, setUser, setToken, logout } = profileSlice.actions;
export default profileSlice.reducer;