import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loader: false,
  waitMessage: "",
};

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    startLoader: (state, action) => {
      state.loader = true;
      state.waitMessage = action.payload;
    },
    stopLoader: (state) => {
      state.loader = false;
      state.waitMessage = "";
    },
  },
});

const LoaderReducer = loaderSlice.reducer;

const LoaderActions = loaderSlice.actions;

export { LoaderActions, LoaderReducer };
