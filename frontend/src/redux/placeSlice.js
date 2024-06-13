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
        deletePlaceStart: (state) => {
            state.places.isFetching = true;
        },
        deletePlaceSuccess: (state, action) => {
            state.places.isFetching = false;
            state.places.allPlaces = state.places.allPlaces.filter((p) => p._id !== action.payload);
            state.places.error = false;
        },
        deletePlaceFailure: (state) => {
            state.places.isFetching = false;
            state.places.error = true;
        },
        updatePlaceStart: (state) => {
            state.places.isFetching = true;
        },
        updatePlaceSuccess: (state, action) => {
            state.places.isFetching = false;
            state.places.error = false;
        },
        updatePlaceFailure: (state, action) => {
            state.places.isFetching = false;
            state.places.error = true;
        },
        addPlaceStart: (state) => {
            state.places.isFetching = true;
        },
        addPlaceSuccess: (state, action) => {
            state.places.isFetching = false;
            state.places.allPlaces.push(action.payload);
            state.places.error = false;
        },
        addPlaceFailure: (state) => {
            state.places.isFetching = false;
            state.places.error = true;
        }
    }
});

export const { 
    
    getPlacesStart,
    getPlacesSuccess,
    getPlacesFailure,
    deletePlaceStart,
    deletePlaceSuccess,
    deletePlaceFailure,
    updatePlaceStart,
    updatePlaceSuccess,
    updatePlaceFailure,
    addPlaceStart,
    addPlaceSuccess,
    addPlaceFailure
} = placeSlice.actions;

export default placeSlice.reducer;