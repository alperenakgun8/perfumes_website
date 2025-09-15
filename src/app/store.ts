import { configureStore } from '@reduxjs/toolkit';
import concentrationReducer from '../features/concentrations/slices/concentrationSlice';

export const store = configureStore({
  reducer: {
    concentration: concentrationReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch