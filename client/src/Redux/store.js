import { configureStore } from '@reduxjs/toolkit';
import authSlice from './Slices/authSlice';
import ticketSlice from './Slices/ticketSlice';

const store = configureStore({
  reducer: {
    authSlice: authSlice,
    ticketSlice: ticketSlice,
  },
  devTools: true,
});

export default store;
