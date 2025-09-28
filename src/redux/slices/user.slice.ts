import { CreateUser } from "../../api/create.ts";
import { GetAllUser } from "../../api/list.ts";
import { UpdateUserApi } from "../../api/update.ts";
import { DeleteUserApi } from "../../api/delete.ts";
import { showToast } from "../../components/common/showToast.tsx";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UserResponse {
  data: any[];
  total: number;
  currentPage: number;
  totalPages: number;
}

interface UsersState {
  users: any[];
  total: number;
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

interface FetchUsersParams {
  page: number;
  per_page: number;
  search?: string;
  range?: string;
  fromDate?: string;
  toDate?: string;
}

const initialState: UsersState = {
  users: [],
  total: 0,
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: null,
};

export const fetchAllUsers = createAsyncThunk<
  UserResponse, FetchUsersParams, { rejectValue: string }>(
    "users/fetchAll",
    async (params, { rejectWithValue }) => {
      try {
        const res = await GetAllUser(params);
        if (res) {
          return {
            data: res.data,
            total: res.total,
            currentPage: res.per_page,
            totalPages: res.total_pages,
          };
        } else {
          return rejectWithValue(res || "Failed to fetch users.");
        }
      } catch (error: any) {
        return rejectWithValue(
          error?.response?.data?.message || "Fetch failed!"
        );
      }
    }
  );

export const PostUser = createAsyncThunk(
  "user/create",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await CreateUser(data);
      if (res) {
        showToast("User created successfully", "success");
      } else {
        showToast(res.error || "Failed to create user.", "error");
        return rejectWithValue(res.error || "Failed to create user.");
      }
    } catch (error: any) {
      return rejectWithValue(error?.response?.error || "User creation failed!");
    }
  }
);

export const putUserById = createAsyncThunk(
  "users/updateById",
  async ({ id, data }: { id: any; data: any }, { rejectWithValue }) => {
    try {
      const res = await UpdateUserApi(id, data);
      if (res) {
        showToast("User updated successfully", "success");
      } else {
        showToast(res.error, "error");
        return rejectWithValue(res.error || "Failed to update user.");
      }
    } catch (error: any) {
      return rejectWithValue(error?.response?.error || "Update failed!");
    }
  }
);

export const deleteUserById = createAsyncThunk(
  "users/deleteById",
  async (id: any, { rejectWithValue }) => {
    try {
      await DeleteUserApi(id);
      showToast("User deleted successfully", "success");
    } catch (error: any) {
      return rejectWithValue(error?.response?.error || "Delete failed!");
    }
  }
);


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUsersState: (state) => {
      state.users = [];
      state.total = 0;
      state.currentPage = 1;
      state.totalPages = 1;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
        state.total = action.payload.total;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : "Something went wrong";
      });

    builder
      //  CREATE USER
      .addCase(PostUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // .addCase(PostUser.fulfilled, (state, action) => {
      //   state.loading = false;
      // })
      .addCase(PostUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.meta.arg) {
          const newUser = {
            id: Date.now(), // fake ID for UI
            ...action.meta.arg
          };
          state.users.unshift(newUser); // Add on top of the list
          state.total += 1;
        }
      })
      .addCase(PostUser.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : "Create failed";
      });

    builder
      //  UPDATE USER
      .addCase(putUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // .addCase(putUserById.fulfilled, (state, action) => {
      //   state.loading = false;
      // })
      .addCase(putUserById.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.meta.arg.data;
        const id = action.meta.arg.id;

        const index = state.users.findIndex(u => u.id === id);
        if (index !== -1) {
          state.users[index] = { ...state.users[index], ...updatedUser };
        }
      })
      .addCase(putUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : "Something went wrong";
      });

    builder
      //  DELETE USER
      .addCase(deleteUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserById.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.meta.arg; // id of deleted user
        state.users = state.users.filter(user => user.id !== id);
        state.total -= 1; // update total count
      })
      .addCase(deleteUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : "Something went wrong";
      });
  }

});

export const { clearUsersState } = userSlice.actions;
export default userSlice.reducer;
