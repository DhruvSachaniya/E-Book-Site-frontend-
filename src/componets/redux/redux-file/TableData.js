import { createSlice } from '@reduxjs/toolkit';

export const CounterData = createSlice({
  name: 'DataNumber',
  initialState: {
    value: [],
  },
  reducers: {
    StoreTableData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { StoreTableData } = CounterData.actions;

export default CounterData.reducer;
