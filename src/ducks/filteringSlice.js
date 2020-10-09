import { createSlice } from '@reduxjs/toolkit';

export const filteringSlice = createSlice({
  name: 'filtering',
  initialState: {
    nameCriteria: '',
  },
  reducers: {
    setNameCriteria: (state, action) => {
      state.nameCriteria = action.payload;
    },
  },
});

export const { setNameCriteria } = filteringSlice.actions;

export default filteringSlice.reducer;