import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    coordinates: {
      lat: "18.969539",
      lng: "72.819329",
    },
  },
  reducers: {
    update: (state, action) => {
      state.coordinates.lat = action.payload.lat;
      state.coordinates.lng = action.payload.lng;
    },
  },
});

export const { update } = locationSlice.actions;

export default locationSlice.reducer;
