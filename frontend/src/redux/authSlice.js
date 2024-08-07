import {createSlice} from '@reduxjs/toolkit'
import { editUser } from './apiRequest';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false,
        },
        register: {
            isFetching: false,
            error: false,
            success: false,
        },
        messeage: "",

    },
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
            state.messeage = action.payload;
        },
        loginFailure: (state, action) => {
            state.login.isFetching = false;
            state.login.error = true;
            state.messeage = action.payload;
        },
        registerStart: (state) => {
            state.register.isFetching = true;
        },
        registerSuccess: (state) => {
            state.register.isFetching = false;
            state.register.error = false;
            state.register.success = true;
        },
        registerFailure: (state) => {
            state.register.isFetching = false;
            state.register.error = true;
            state.register.success = false;
        },
        logOutStart: (state) => {
            state.login.isFetching = true;
        },
        logOutSuccess: (state) => {
            state.login.isFetching = false;
            state.login.currentUser = null;
            state.login.error = false;
        },
        logOutFailure: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },
        editUserStart: (state) => {
            state.login.isFetching = true;
        },
        editUserSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
        },
        editUserFailure: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },
    }

});

export const { 
    loginStart, 
    loginSuccess, 
    loginFailure,
    registerStart,
    registerSuccess,
    registerFailure,
    logOutStart,
    logOutSuccess,
    logOutFailure,
    editUserStart,
    editUserSuccess,
    editUserFailure,
} = authSlice.actions;

export default authSlice.reducer;