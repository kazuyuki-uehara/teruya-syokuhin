import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counter/counterSlice'
import conversionTableReducer from './features/services/conversionTableSlice'
// import themeReducer from './features/theme/theme-slice'


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    conversionTable : conversionTableReducer
    // theme:themeReducer
  },
  middleware: (getDefaultMiddleware) =>getDefaultMiddleware({
    serializableCheck: false,
  }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch