import { configureStore } from '@reduxjs/toolkit';
import { championsSlice } from '../ducks/championsSlice';
import { filteringSlice } from '../ducks/filteringSlice';

export default configureStore({
  reducer: {
    champions: championsSlice.reducer,
    filtering: filteringSlice.reducer,
  },
});