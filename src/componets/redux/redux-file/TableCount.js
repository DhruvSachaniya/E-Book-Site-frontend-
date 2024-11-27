import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 10,
  },
  reducers: {
    counterTable: (state, action) => {
      state.value = action.payload / 5;
    },
  },
});

// Action creators are generated for each case reducer function
export const { counterTable } = counterSlice.actions;

export default counterSlice.reducer;
