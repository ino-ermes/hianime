import { configureStore } from '@reduxjs/toolkit';
import authReduer from './slices/authSlice';
import genresReduer from './slices/genresSlice';
import studiosReduer from './slices/studiosSlice';

export const store = configureStore({
  reducer: {
    auth: authReduer,
    genres: genresReduer,
    studios: studiosReduer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
