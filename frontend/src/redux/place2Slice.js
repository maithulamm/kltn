import { createSlice } from '@reduxjs/toolkit';


const place2Slice = createSlice({
    name: 'places2',
    initialState: {
        places2: {
            allPlaces2: null,
            isFetching: false,
            error: false
        }
        
    },
    reducers : {
        getPlaces2Start: (state) => {
            state.places2.isFetching = true;
            //state.places2.error = false;
        },
        getPlaces2Success: (state, action) => {
            state.places2.isFetching = false;
            state.places2.allPlaces2 = action.payload;
            state.places2.error = false;
        },
        getPlaces2Failure: (state) => {
            state.places2.isFetching = false;
            state.places2.error = true;
        },
        deletePlace2Start: (state) => {
            state.places2.isFetching = true;
        },
        deletePlace2Success: (state, action) => {
            state.places2.isFetching = false;
            state.places2.allPlaces2 = state.places2.allPlaces2.filter((p) => p._id !== action.payload);
            state.places2.error = false;
        },
        deletePlace2Failure: (state) => {
            state.places2.isFetching = false;
            state.places2.error = true;
        },
        updatePlace2Start: (state) => {
            state.places2.isFetching = true;
        },
        updatePlace2Success: (state, action) => {
            state.places2.isFetching = false;
            state.places2.error = false;
        },
        updatePlace2Failure: (state, action) => {
            state.places2.isFetching = false;
            state.places2.error = true;
        },
        addPlace2Start: (state) => {
            state.places2.isFetching = true;
        },
        addPlace2Success: (state, action) => {
            state.places2.isFetching = false;
            state.places2.allPlaces2.push(action.payload);
            state.places2.error = false;
        },
        addPlace2Failure: (state) => {
            state.places2.isFetching = false;
            state.places2.error = true;
        }
    }
});

export const { 
    
    getPlaces2Start,
    getPlaces2Success,
    getPlaces2Failure,
    deletePlace2Start,
    deletePlace2Success,
    deletePlace2Failure,
    updatePlace2Start,
    updatePlace2Success,
    updatePlace2Failure,
    addPlace2Start,
    addPlace2Success,
    addPlace2Failure
} = place2Slice.actions;

export default place2Slice.reducer;