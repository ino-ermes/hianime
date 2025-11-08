import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { client, getAuthClient } from '../../api/client';
import { RootState } from '../store';
import { AxiosError } from 'axios';

export interface GenresState {
  genres: { _id: string; name: string; description: string }[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  formStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  formError: string | null;
}

const initialState: GenresState = {
  genres: [],
  error: null,
  status: 'idle',
  formStatus: 'idle',
  formError: null,
};

export const genresSlice = createSlice({
  name: 'genres',
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
      .addCase(getAllGenres.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getAllGenres.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.genres = action.payload.genres;
      })
      .addCase(getAllGenres.rejected, (state, action) => {
        state.status = 'failed';
        const payload = action.payload as { msg: string };
        state.error = payload.msg;
      })
      .addCase(addGenre.pending, (state, action) => {
        state.formStatus = 'loading';
      })
      .addCase(addGenre.fulfilled, (state, action) => {
        state.formStatus = 'succeeded';
        const { _id, name, description } = action.payload.genre;
        state.genres.push({ _id, name, description });
      })
      .addCase(addGenre.rejected, (state, action) => {
        state.formStatus = 'failed';
        const payload = action.payload as { msg: string };
        state.formError = payload.msg;
      })
      .addCase(updateGenre.pending, (state, action) => {
        state.formStatus = 'loading';
      })
      .addCase(updateGenre.fulfilled, (state, action) => {
        state.formStatus = 'succeeded';
        const { _id, name, description } = action.payload.genre;
        const genre = state.genres.find((value) => value._id === _id);
        genre!.name = name;
        genre!.description = description;
      })
      .addCase(updateGenre.rejected, (state, action) => {
        state.formStatus = 'failed';
        const payload = action.payload as { msg: string };
        state.formError = payload.msg;
      })
      .addCase(deleteGenre.pending, (state, action) => {
        state.formStatus = 'loading';
      })
      .addCase(deleteGenre.fulfilled, (state, action) => {
        state.formStatus = 'succeeded';
        const id = action.payload as string;
        state.genres = state.genres.filter((genre) => genre._id !== id);
      })
      .addCase(deleteGenre.rejected, (state, action) => {
        state.formStatus = 'failed';
        const payload = action.payload as { msg: string };
        state.formError = payload.msg;
      });
  },
});

export const getAllGenres = createAsyncThunk(
  'genres/getAllGenres',
  async (_, { rejectWithValue }) => {
    try {
      const response = await client.get('/genres');
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

export const addGenre = createAsyncThunk(
  'genres/addGenre',
  async (genre: { name: string; description: string }, { rejectWithValue }) => {
    try {
      const response = await getAuthClient().post('/genres', genre);
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

export const updateGenre = createAsyncThunk(
  'genres/updateGenre',
  async (
    genre: { _id: string; name: string; description: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await getAuthClient().put(`/genres/${genre._id}`, {
        name: genre.name,
        description: genre.description,
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

export const deleteGenre = createAsyncThunk(
  'genres/deleteGenre',
  async (_id: string, { rejectWithValue }) => {
    try {
      await getAuthClient().delete(`/genres/${_id}`);
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

export const selectGenres = (state: RootState) => state.genres.genres;
export const selectStatus = (state: RootState) => state.genres.status;
export const selectError = (state: RootState) => state.genres.error;
export const selectFormError = (state: RootState) => state.genres.formError;
export const selectFormStatus = (state: RootState) => state.genres.formStatus;

export const { resetFormStatus, removeError } = genresSlice.actions;

export default genresSlice.reducer;
