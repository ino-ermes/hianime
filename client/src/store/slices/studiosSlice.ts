import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { client, getAuthClient } from '../../api/client';
import { RootState } from '../store';
import { AxiosError } from 'axios';

export interface StudiosState {
  studios: { _id: string; name: string; description: string }[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  formStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  formError: string | null;
}

const initialState: StudiosState = {
  studios: [],
  error: null,
  status: 'idle',
  formStatus: 'idle',
  formError: null,
};

export const studiosSlice = createSlice({
  name: 'studios',
  initialState,
  reducers: {
    resetFormStatus(state) {
      state.formError = null;
      state.formStatus = 'idle';
    },
    removeError(state) {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllStudios.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getAllStudios.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.studios = action.payload.studios;
      })
      .addCase(getAllStudios.rejected, (state, action) => {
        state.status = 'failed';
        const payload = action.payload as { msg: string };
        state.error = payload.msg;
      })
      .addCase(addStudio.pending, (state, action) => {
        state.formStatus = 'loading';
      })
      .addCase(addStudio.fulfilled, (state, action) => {
        state.formStatus = 'succeeded';
        const { _id, name, description } = action.payload.studio;
        state.studios.push({ _id, name, description });
      })
      .addCase(addStudio.rejected, (state, action) => {
        state.formStatus = 'failed';
        const payload = action.payload as { msg: string };
        state.formError = payload.msg;
      })
      .addCase(updateStudio.pending, (state, action) => {
        state.formStatus = 'loading';
      })
      .addCase(updateStudio.fulfilled, (state, action) => {
        state.formStatus = 'succeeded';
        const { _id, name, description } = action.payload.studio;
        const studio = state.studios.find((value) => value._id === _id);
        studio!.name = name;
        studio!.description = description;
      })
      .addCase(updateStudio.rejected, (state, action) => {
        state.formStatus = 'failed';
        const payload = action.payload as { msg: string };
        state.formError = payload.msg;
      })
      .addCase(deleteStudio.pending, (state, action) => {
        state.formStatus = 'loading';
      })
      .addCase(deleteStudio.fulfilled, (state, action) => {
        state.formStatus = 'succeeded';
        const id = action.payload as string;
        state.studios = state.studios.filter((studio) => studio._id !== id);
      })
      .addCase(deleteStudio.rejected, (state, action) => {
        state.formStatus = 'failed';
        const payload = action.payload as { msg: string };
        state.formError = payload.msg;
      });
  },
});

export const getAllStudios = createAsyncThunk(
  'studios/getAllStudios',
  async (_, { rejectWithValue }) => {
    try {
      const response = await client.get('/studios');
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

export const addStudio = createAsyncThunk(
  'studios/addStudio',
  async (studio: { name: string; description: string }, { rejectWithValue }) => {
    try {
      const response = await getAuthClient().post('/studios', studio);
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

export const updateStudio = createAsyncThunk(
  'studios/updateStudio',
  async (
    studio: { _id: string; name: string; description: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await getAuthClient().put(`/studios/${studio._id}`, {
        name: studio.name,
        description: studio.description,
      });
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

export const deleteStudio = createAsyncThunk(
  'studios/deleteStudio',
  async (_id: string, { rejectWithValue }) => {
    try {
      await getAuthClient().delete(`/studios/${_id}`);
      return _id;
    } catch (err) {
      const error = err as AxiosError;
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const selectStudios = (state: RootState) => state.studios.studios;
export const selectStatus = (state: RootState) => state.studios.status;
export const selectError = (state: RootState) => state.studios.error;
export const selectFormError = (state: RootState) => state.studios.formError;
export const selectFormStatus = (state: RootState) => state.studios.formStatus;

export const { resetFormStatus, removeError } = studiosSlice.actions;

export default studiosSlice.reducer;
