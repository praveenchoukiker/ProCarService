import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminService from "./adminService";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    users: [],
    cars: [],
    notes: [],
    message: "",
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.users = action.payload;
      })

      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
       .addCase(getComplaints.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getComplaints.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.cars = action.payload;
      })

      .addCase(getComplaints.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
        .addCase(getAllNotes.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getAllNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.notes = action.payload;
      })

      .addCase(getAllNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default adminSlice.reducer;

//  GET ALL USERS

export const getAllUsers = createAsyncThunk(
  "ADMIN/FETCH/USERS",
  async (_, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;
    try {
      return await adminService.fetchAllUsers(token);
    } catch (error) {
          const message = error.response.data.message;
          return thunkAPI.rejectWithValue(message);

    }
  }
);

//  GET ALL Complaints

export const getComplaints = createAsyncThunk(
  "ADMIN/FETCH/COMPLAINTS",
  async (_, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;
    try {
      return await adminService.fetchAllComplaints(token);
    } catch (error) {
          const message = error.response.data.message;
          return thunkAPI.rejectWithValue(message);

    }
  }
);


//  GET ALL Notes

export const getAllNotes = createAsyncThunk(
  "ADMIN/FETCH/NOTES",
  async (_, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;
    try {
      return await adminService.fetchAllNotes(token);
    } catch (error) {
          const message = error.response.data.message;
          return thunkAPI.rejectWithValue(message);

    }
  }
);
