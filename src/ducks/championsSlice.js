import { createSlice } from '@reduxjs/toolkit';
import api from '../services/api';

export const championsSlice = createSlice({
  name: 'champions',
  initialState: {
    isLoading: false,
    isError: false,
    items: [],
  },
  reducers: {
    setChampionsLoading: (state) => {
      state.isError = false;
      state.isLoading = true;
    },
    setChampionsSuccess: (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.items = action.payload;
    },
    setChampionsError: (state) => {
      state.isError = true;
      state.isLoading = false;
    },
  },
});

const { setChampionsSuccess, setChampionsError, setChampionsLoading } = championsSlice.actions;

export const retrieveChampions = () => async (dispatch) => {
  dispatch(setChampionsLoading());
  try{
    const {data: {data: data}} = await api.get('');

    const retrievedChampions = Object.values(data);
    dispatch(setChampionsSuccess(retrievedChampions));
  }catch(err){
    dispatch(setChampionsError());
  }
};

export default championsSlice.reducer;