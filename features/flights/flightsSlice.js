import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchFlights = createAsyncThunk(
  'flights/fetchFlights',
  async () => {
    const unixTime = Math.floor(new Date().getTime() / 1000);
    console.log('unixTime', unixTime);
    const unixTimeMinusDay = unixTime - 8640000;
    const unixTimePlusHour = unixTime + 360000;
    console.log('unixTimePlusHour: ', unixTimePlusHour);
    const fetchURL =
      'https://opensky-network.org/api/flights/arrival?airport=KIAH&begin=' +
      unixTimeMinusDay +
      '&end=' +
      unixTimePlusHour;
    console.log('fetchURL: ', fetchURL);
    const response = await fetch(fetchURL);
    const data = response.json();
    console.log('data', data);
    return data;
  }
);

const flightsSlice = createSlice({
  name: 'flights',
  initialState: { isLoading: true, errMess: null, flightsArray: [] },
  reducers: {},
  extraReducers: {
    [fetchFlights.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchFlights.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.errMess = null;
      state.flightsArray = action.payload;
    },
    [fetchFlights.rejected]: (state, action) => {
      state.isLoading = false;
      state.errMess = action.error ? action.error.message : 'Fetch failed';
    },
  },
});

export const flightsReducer = flightsSlice.reducer;
