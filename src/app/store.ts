import { configureStore } from '@reduxjs/toolkit';
import concentrationReducer from '../features/concentrations/slices/concentrationSlice';
import noteReducer from '../features/notes/slices/noteSlice';
import perfumeReducer from '../features/perfumes/slices/perfumeSlice';
import  userReducer  from '../features/users/slices/userSlice';
import commentReducer from '../features/comments/slices/commentSlice';
import  topicReducer  from '../features/topics/slices/topicSlice';
import topicsCommentReducer from '../features/topicsComment/slices/topicsCommentSlice';

export const store = configureStore({
  reducer: {
    concentration: concentrationReducer,
    note: noteReducer,
    perfume: perfumeReducer,
    user: userReducer,
    comment: commentReducer,
    topic: topicReducer,
    topic_comment: topicsCommentReducer
  },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch