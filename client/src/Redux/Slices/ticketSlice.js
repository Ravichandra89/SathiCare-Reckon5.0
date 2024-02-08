import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import axiosInstance from '../../Helper/axiosInstance';

export const getAllTicket = createAsyncThunk('/ticket', async () => {
  try {
    const res = axiosInstance.get('/ticket');
    return await res;
  } catch (error) {
    toast.error('Somthing went wrong!');
  }
});

const ticketSlice = createSlice({
  name: 'ticket',
  initialState: {
    ticketList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllTicket.fulfilled, (state, action) => {
      // console.log(action.payload.data.result);
      state.ticketList = action.payload.data.result;
    });
  },
});

export default ticketSlice.reducer;
