import { getTurtles } from "@/services/api";
import { Turtle } from "@prisma/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTurtles = createAsyncThunk(
  "turtles/fetchTurtles",
  async (_, { dispatch }) => {
    const { data } = await dispatch(getTurtles.initiate());
    return data;
  },
);

interface TurtlesState {
  isLoading: boolean;
  data: Turtle[];
}

const initialState: TurtlesState = {
  isLoading: true,
  data: [],
};

export const turtlesSlice = createSlice({
  name: "turtles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTurtles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTurtles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload || [];
      });
  },
});
