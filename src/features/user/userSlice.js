import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customfetch from "../../utils/axios";
import {
  addusertolocalstorage,
  getuserfromlocalstorage,
  removeuserfromlocalstorage,
} from "../../utils/localstorage";

const initialState = {
  isloading: false,
  issidebaropen: false,
  user: getuserfromlocalstorage(),
};

export const registeruser = createAsyncThunk(
  "user/registeruser",
  async (user, thunkAPI) => {
    try {
      const resp = await customfetch.post("/auth/register", user);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);
export const loginuser = createAsyncThunk(
  "user/loginuser",
  async (user, thunkAPI) => {
    try {
      const resp = await customfetch.post("/auth/login", user);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);
export const updateuser = createAsyncThunk(
  "user/updateUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customfetch.patch("/auth/updateUser", user, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      return resp.data;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutuser());
        return thunkAPI.rejectWithValue("Unauthorized logging out");
      }
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    togglesidebar: (state) => {
      state.issidebaropen = !state.issidebaropen;
    },
    logoutuser: (state, { payload }) => {
      state.user = null;
      state.issidebaropen = false;
      removeuserfromlocalstorage();
      if (payload) {
        toast.success(payload);
      }
    },
  },
  extraReducers: {
    [registeruser.pending]: (state) => {
      state.isloading = true;
    },
    [registeruser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isloading = false;
      state.user = user;
      addusertolocalstorage(user);
      toast.success(`hello there ${user.name}`);
    },
    [registeruser.rejected]: (state, { payload }) => {
      state.isloading = false;
      toast.error(payload);
    },
    [loginuser.pending]: (state) => {
      state.isloading = true;
    },
    [loginuser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isloading = false;
      state.user = user;
      addusertolocalstorage(user);
      toast.success(`Welcome back ${user.name}`);
    },
    [loginuser.rejected]: (state, { payload }) => {
      state.isloading = false;
      toast.error(payload);
    },
    [updateuser.pending]: (state) => {
      state.isloading = true;
    },
    [updateuser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isloading = false;
      state.user = user;
      addusertolocalstorage(user);
      toast.success(`User Updated!`);
    },
    [updateuser.rejected]: (state, { payload }) => {
      state.isloading = false;
      toast.error(payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registeruser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registeruser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addusertolocalstorage(user);
        toast.success(`Hello There ${user.name}`);
      })
      .addCase(registeruser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(loginuser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginuser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addusertolocalstorage(user);

        toast.success(`Welcome Back ${user.name}`);
      })
      .addCase(loginuser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(updateuser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateuser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addusertolocalstorage(user);

        toast.success(`User Updated!`);
      })
      .addCase(updateuser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const { togglesidebar, logoutuser } = userSlice.actions;
export default userSlice.reducer;
