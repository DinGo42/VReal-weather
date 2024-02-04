import { StatusCodes } from "@weather/shared";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ErrorState = {
  isError: boolean;
  type: StatusCodes | null;
  message: string | null;
};

type InitialErrorState = ErrorState;

const initialState: InitialErrorState = {
  isError: false,
  type: null,
  message: null,
};

export const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    createError(state, action: PayloadAction<ErrorState>) {
      state.isError = action.payload.isError;
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    clearError(state) {
      state.isError = false;
      state.type = null;
      state.message = null;
    },
  },
});
export const { clearError, createError } = errorSlice.actions;

export const errorReducer = errorSlice.reducer;
