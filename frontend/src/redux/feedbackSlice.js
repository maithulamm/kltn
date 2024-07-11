import { createSlice } from '@reduxjs/toolkit';

const feedbackSlice = createSlice({
    name: 'feedback',
    initialState: {
        feedback: {
            allFeedback: null,
            isFetching: false,
            error: false
        },
        message: "",
    },
    reducers: {
        getFeedbackStart: (state) => {
            state.feedback.isFetching = true;
        },
        getFeedbackSuccess: (state, action) => {
            state.feedback.isFetching = false;
            state.feedback.allFeedback = action.payload;
            state.feedback.error = false;
        },
        getFeedbackFailure: (state) => {
            state.feedback.isFetching = false;
            state.feedback.error = true;
        },
        deleteFeedbackStart: (state) => {
            state.feedback.isFetching = true;
        },
        deleteFeedbackSuccess: (state, action) => {
            state.feedback.isFetching = false;
            state.message = action.payload;
        },
        deleteFeedbackFailure: (state, action) => {
            state.feedback.isFetching = false;
            state.feedback.error = true;
            state.message = action.payload;
        },
        updateFeedbackStart: (state) => {
            state.feedback.isFetching = true;
        },
        updateFeedbackSuccess: (state, action) => {
            state.feedback.isFetching = false;
            state.feedback.error = false;
        },
        updateFeedbackFailure: (state, action) => {
            state.feedback.isFetching = false;
            state.feedback.error = true;
        },
        addFeedbackStart: (state) => {
            state.feedback.isFetching = true;
        },
        addFeedbackSuccess: (state, action) => {
            state.feedback.isFetching = false;
            state.feedback.allFeedback.push(action.payload);
            state.feedback.error = false;
        },
        addFeedbackFailure: (state) => {
            state.feedback.isFetching = false;
            state.feedback.error = true;
        }
    }
});

export const {
    getFeedbackStart,
    getFeedbackSuccess,
    getFeedbackFailure,
    deleteFeedbackStart,
    deleteFeedbackSuccess,
    deleteFeedbackFailure,
    updateFeedbackStart,
    updateFeedbackSuccess,
    updateFeedbackFailure,
    addFeedbackStart,
    addFeedbackSuccess,
    addFeedbackFailure
} = feedbackSlice.actions;
export default feedbackSlice.reducer;
