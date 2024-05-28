import { createSlice } from '@reduxjs/toolkit';


const placeSlice = createSlice({
    name: 'places',
    initialState: {
        places: {
            allPlaces: null,
            isFetching: false,
            error: false
        }
        
    },
    reducers : {
        getPlacesStart: (state) => {
            state.places.isFetching = true;
            //state.places.error = false;
        },
        getPlacesSuccess: (state, action) => {
            state.places.isFetching = false;
            state.places.allPlaces = action.payload;
            state.places.error = false;
        },
        getPlacesFailure: (state) => {
            state.places.isFetching = false;
            state.places.error = true;
        },
        deleteUserStart: (state) => {
            state.places.isFetching = true;
        },
        deleteUserSuccess: (state, action) => {
            state.places.isFetching = false;
            // state.message = action.payload;
            // state.deleteUser.error = false;
        },
        deleteUserFailure: (state, action) => {
            state.places.isFetching = false;
            state.places.error = true;
            state.message = action.payload;
        },
    }
});

export const { 
    getPlacesStart, 
    getPlacesSuccess, 
    getPlacesFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure
} = placeSlice.actions;

export default placeSlice.reducer;