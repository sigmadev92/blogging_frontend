import { createSlice } from "@reduxjs/toolkit";
import { dbLefttabs } from "../../functions/constants/dashboard";

const initialState: { tab: string } = {
  tab: dbLefttabs[0].label,
};
const dbMenuSlice = createSlice({
  name: "dbTab",
  initialState,
  reducers: {
    setTab: (state, action) => {
      state.tab = action.payload;
    },
  },
});

const dbMenuReducer = dbMenuSlice.reducer;

const dbMenuActions = dbMenuSlice.actions;

export { dbMenuActions, dbMenuReducer };
