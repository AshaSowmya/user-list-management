import { Userlogin, UserRegister } from "../../api/create.ts";
import { showToast } from "../../components/common/showToast.tsx";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Initial state
interface LoginState {
  user: any;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: LoginState = {
  user: {},
  status: "idle",
  error: null,
};


export const RegisterAction = createAsyncThunk(
  "auth/register",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await UserRegister(data);
      if (res) {
       showToast(res?.message, "success");
        return res;
      } else {
        // showToast(res?.message, "error");
        showToast(res?.error || "Register failed!", "error");
        return rejectWithValue(res?.error || "Register failed!");
      }
    } catch (error: any) {
      return rejectWithValue({
        message: error?.response?.data?.message || "Register failed!",
      });
    }
  }
)

export const LoginAction = createAsyncThunk(
  "auth/login",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await Userlogin(data);

      if (res) {
        showToast("Login successfully", "success");
        localStorage.setItem("token", res?.token);
        return res;
      } else {
        showToast(res?.error || "Login failed!", "error");
        return rejectWithValue(res.message);
      }
    } catch (error: any) {
      return rejectWithValue({
        message: error?.response?.data?.message || "Login failed!",
      });
    }
  }
);




// Slice
const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    addLoginData: (state, action) => {
      return action.payload;
    },
  },
extraReducers: (builder) => {
  builder
    .addCase(LoginAction.pending, (state) => {
      state.status = "loading";
      state.error = null;
    })
    .addCase(LoginAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = "succeeded";
    })
    .addCase(LoginAction.rejected, (state, action) => {
      state.status = "failed";
      state.error = (action.payload as { message: string })?.message ?? null;
    });
}

});

export default loginSlice.reducer;
export const { addLoginData } = loginSlice.actions;
