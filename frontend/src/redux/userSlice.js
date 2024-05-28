import { createSlice } from '@reduxjs/toolkit';


const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: {
            allUsers: null,
            isFetching: false,
            error: false
        },
        message: "",
        
    },
    reducers : {
        getUsersStart: (state) => {
            state.users.isFetching = true;
            //state.users.error = false;
        },
        getUsersSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allUsers = action.payload;
            state.users.error = false;
        },
        getUsersFailure: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        },
        deleteUserStart: (state) => {
            state.users.isFetching = true;
        },
        deleteUserSuccess: (state, action) => {
            state.users.isFetching = false;
            state.message = action.payload;
            // state.deleteUser.error = false;
        },
        deleteUserFailure: (state, action) => {
            state.users.isFetching = false;
            state.users.error = true;
            state.message = action.payload;
        },
    }
});

export const { 
    getUsersStart, 
    getUsersSuccess, 
    getUsersFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure
} = userSlice.actions;

export default userSlice.reducer;