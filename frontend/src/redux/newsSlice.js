import { createSlice } from '@reduxjs/toolkit';

const newsSlice = createSlice({
    name: 'news',
    initialState: {
        news: {
            allNews: null,
            isFetching: false,
            error: false
        },
        message: "",
    },
    reducers: {
        getNewsStart: (state) => {
            state.news.isFetching = true;
            //state.news.error = false;
        },
        getNewsSuccess: (state, action) => {
            state.news.isFetching = false;
            state.news.allNews = action.payload;
            state.news.error = false;
        },
        getNewsFailure: (state) => {
            state.news.isFetching = false;
            state.news.error = true;
        },
        deleteNewsStart: (state) => {
            state.news.isFetching = true;
        },
        deleteNewsSuccess: (state, action) => {
            state.news.isFetching = false;
            state.message = action.payload;
            // state.deleteNews.error = false;
        },
        deleteNewsFailure: (state, action) => {
            state.news.isFetching = false;
            state.news.error = true;
            state.message = action.payload;
        },
        updateNewsStart: (state) => {
            state.news.isFetching = true;
        },
        updateNewsSuccess: (state, action) => {
            state.news.isFetching = false;
            state.news.error = false;
        },
        updateNewsFailure: (state, action) => {
            state.news.isFetching = false;
            state.news.error = true;
        },
        addNewsStart: (state) => {
            state.news.isFetching = true;
        },
        addNewsSuccess: (state, action) => {
            state.news.isFetching = false;
            state.news.allNews.push(action.payload);
            state.news.error = false;
        },
    }
});

export const { getNewsStart, getNewsSuccess, getNewsFailure, deleteNewsStart, deleteNewsSuccess, deleteNewsFailure, updateNewsStart, updateNewsSuccess, updateNewsFailure, addNewsStart, addNewsSuccess } = newsSlice.actions;
export default newsSlice.reducer;