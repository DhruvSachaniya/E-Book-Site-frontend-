import { createSlice } from '@reduxjs/toolkit';

export const CurrentPageData = createSlice({
  name: 'CurrentPageData',
  initialState: {
    currentPageData: [],
    itemsPerPage: 5,
  },
  reducers: {
    UpdatePageData: (state, action) => {
      state.currentPageData = action.payload;
    },
  },
});

export const { UpdatePageData } = CurrentPageData.actions;

export default CurrentPageData.reducer;
