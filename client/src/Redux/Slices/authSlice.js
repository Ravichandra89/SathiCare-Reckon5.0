import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import axiosInstance from '../../Helper/axiosInstance';

export const createAccount = createAsyncThunk('/auth/signup', async (data) => {
  try {
    console.log(data);
    const result = axiosInstance.post('/user/register', data);
    toast.promise(result, {
      loading: 'wait! Creating Account',
      success: (data) => data?.data?.message,
      error: 'Failed to create account',
    });
    return (await result).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    throw error; // Make sure to rethrow the error so that Redux Toolkit can handle it
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || false,
    data: localStorage.getItem('data') || '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createAccount.fulfilled, (state, action) => {
      localStorage.setItem('data', JSON.stringify(action?.payload?.user));
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('role', action?.payload?.user?.role);
      state.isLoggedIn = true;
      state.data = action?.payload?.user;
      state.role = action?.payload?.user?.role;
    });
  },
});

export default authSlice.reducer;
