import { createSlice } from '@reduxjs/toolkit';

const typePlaceSlice = createSlice({
    name: 'typePlaces',
    initialState: {
        typePlaces: {
            allTypePlaces: null,
            isFetching: false,
            error: false
        }
    },
    reducers: {
        getTypePlacesStart: (state) => {
            state.typePlaces.isFetching = true;
            //state.typePlaces.error = false;
        },
        getTypePlacesSuccess: (state, action) => {
            state.typePlaces.isFetching = false;
            state.typePlaces.allTypePlaces = action.payload;
            state.typePlaces.error = false;
        },
        getTypePlacesFailure: (state) => {
            state.typePlaces.isFetching = false;
            state.typePlaces.error = true;
        },
        deleteTypePlaceStart: (state) => {
            state.typePlaces.isFetching = true;
        },
        deleteTypePlaceSuccess: (state, action) => {
            state.typePlaces.isFetching = false;
            state.typePlaces.allTypePlaces = state.typePlaces.allTypePlaces.filter((p) => p._id !== action.payload);
            state.typePlaces.error = false;
        },
        deleteTypePlaceFailure: (state) => {
            state.typePlaces.isFetching = false;
            state.typePlaces.error = true;
        },
        updateTypePlaceStart: (state) => {
            state.typePlaces.isFetching = true;
        },
        updateTypePlaceSuccess: (state, action) => {
            state.typePlaces.isFetching = false;
            state.typePlaces.error = false;
        },
        updateTypePlaceFailure: (state, action) => {
            state.typePlaces.isFetching = false;
            state.typePlaces.error = true;
        },
        addTypePlaceStart: (state) => {
            state.typePlaces.isFetching = true;
        },
        addTypePlaceSuccess: (state, action) => {
            state.typePlaces.isFetching = false;
            state.typePlaces.allTypePlaces.push(action.payload);
            state.typePlaces.error = false;
        },
        addTypePlaceFailure: (state) => {
            state.typePlaces.isFetching = false;
            state.typePlaces.error = true;
        },
    }
});

export const {
    getTypePlacesStart,
    getTypePlacesSuccess,
    getTypePlacesFailure,
    deleteTypePlaceStart,
    deleteTypePlaceSuccess,
    deleteTypePlaceFailure,
    updateTypePlaceStart,
    updateTypePlaceSuccess,
    updateTypePlaceFailure,
    addTypePlaceStart,
    addTypePlaceSuccess,
    addTypePlaceFailure
} = typePlaceSlice.actions;

export default typePlaceSlice.reducer;