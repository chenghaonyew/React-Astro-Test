import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  savedChannel: null,
};

const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    setChannels: (state, action) => {
      state.savedChannel = action.payload.savedChannel;
    },
  },
});

export const { setChannels } = channelSlice.actions;

export const selectSavedChannel = (state) => state.channel.savedChannel;

export default channelSlice.reducer;
