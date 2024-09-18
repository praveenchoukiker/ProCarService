import {
  asyncThunkCreator,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import authService from "./authService";

const userExist = JSON.parse(localStorage.getItem("user"));

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    user: userExist || null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        (state.isLoading = true),
          (state.isError = false),
          (state.isSuccess = false);
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isError = false),
          (state.isSuccess = true);
        state.user = action.payload;
      })

      .addCase(registerUser.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isError = true),
          (state.isSuccess = false);
        state.message = action.payload;
      })

      .addCase(loginUser.pending, (state, action) => {
        (state.isLoading = true),
          (state.isError = false),
          (state.isSuccess = false);
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isError = false),
          (state.isSuccess = true);
        state.user = action.payload;
      })

      .addCase(loginUser.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isError = true),
          (state.isSuccess = false);
        state.message = action.payload;
      })

      .addCase(logOutUser.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isError = false),
          (state.isSuccess = false);
        state.message = "";
        state.user = null;
      });
  },
});

export default authSlice.reducer;

// Register user
export const registerUser = createAsyncThunk(
  "AUTH/REGISTER",
  async (formData, thunkAPI) => {
    try {
      return await authService.Register(formData);
    } catch (error) {
      //   console.log(error);
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// LoginUsers
export const loginUser = createAsyncThunk(
  "AUTH/LOGIN",
  async (formData, thunkAPI) => {
    try {
      return await authService.Login(formData);
    } catch (error) {
      //   console.log(error);
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// LogOut

export const logOutUser = createAsyncThunk("AUTH/LOGOUT", async () => {
  localStorage.removeItem("user");
});
