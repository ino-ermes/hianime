import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  client,
  removeAuthClient,
  setAndGetAuthClient,
  setAuthClient,
} from '../../api/client';
import { AxiosError } from 'axios';
import { RootState } from '../store';

export interface AuthState {
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
    avtPath?: string;
  } | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  gettingUser: boolean;
  error: string | null;
  setting: {
    autoPlay: boolean;
    autoNext: boolean;
  };
}

const initialState: AuthState = {
  user: null,
  error: null,
  status: 'idle',
  gettingUser: true,
  setting: {
    autoPlay:
      localStorage.getItem('autoPlay') === 'true' ? true : false || false,
    autoNext:
      localStorage.getItem('autoNext') === 'true' ? true : false || false,
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetStatus(state) {
      state.error = null;
      state.status = 'idle';
    },
    logoutUser(state) {
      removeAuthClient();
      state.user = null;
    },
    setAtvPath(state, action) {
      if (state.user) {
        state.user.avtPath = action.payload.avtPath;
      }
    },
    setSetting(state, action) {
      const { autoPlay, autoNext } = action.payload;
      state.setting.autoPlay = autoPlay;
      state.setting.autoNext = autoNext;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { user, token } = action.payload;
        state.user = {
          _id: user._id,
          email: user.email,
          role: user.role,
          name: user.name,
          avtPath: user.avtPath,
        };
        state.setting = user.setting || {
          autoNext: false,
          autoPlay: false,
        };
        setAuthClient(token);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        const payload = action.payload as { msg: string };
        state.error = payload.msg;
      })
      .addCase(register.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { user, token } = action.payload;
        state.user = {
          _id: user._id,
          email: user.email,
          role: user.role,
          name: user.name,
          avtPath: user.avtPath,
        };
        state.setting = user.setting || {
          autoNext: false,
          autoPlay: false,
        };
        setAuthClient(token);
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        const payload = action.payload as { msg: string };
        state.error = payload.msg;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.gettingUser = false;
        const { user } = action.payload;
        state.user = {
          _id: user._id,
          email: user.email,
          role: user.role,
          name: user.name,
          avtPath: user.avtPath,
        };
        state.setting = user.setting || {
          autoNext: false,
          autoPlay: false,
        };
      })
      .addCase(getUser.rejected, (state, action) => {
        state.gettingUser = false;
      });
  },
});

export const login = createAsyncThunk(
  'auth/login',
  async (user: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await client.post('/auth/login', user);
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (
    user: { email: string; password: string; name: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await client.post('/auth/register', user);
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUser = createAsyncThunk(
  'auth/getUser',
  async (_, { rejectWithValue }) => {
    const authClient = setAndGetAuthClient();
    if (authClient) {
      try {
        const response = await authClient.get('/auth/get-user');
        return response.data;
      } catch (err) {
        const error = err as AxiosError;
        if (!error.response) {
          throw error;
        }
        return rejectWithValue(error.response.data);
      }
    } else {
      return rejectWithValue({ msg: 'token not found' });
    }
  }
);

export const { resetStatus, logoutUser, setAtvPath, setSetting } =
  authSlice.actions;
export const selectUser = (state: RootState) => state.auth.user;
export const selectSetting = (state: RootState) => state.auth.setting;

export default authSlice.reducer;
