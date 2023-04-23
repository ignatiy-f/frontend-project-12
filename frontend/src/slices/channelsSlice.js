/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channelsList: [],
  curChannelId: 1,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels(state, { payload }) {
      state.channelsList = payload;
    },
    addChannel(state, { payload }) {
      state.channelsList.push(payload);
    },
    renameChannel(state, { payload }) {
      const curChannel = state.channelsList.find(({ id }) => id === payload.id);
      curChannel.name = payload.name;
    },
    removeChannel(state, { payload }) {
      const newChannelsList = state.channelsList.filter(({ id }) => id !== payload.id);
      state.channelsList = newChannelsList;
      state.curChannelId = 1;
    },
    setCurChannelId(state, { payload }) {
      state.curChannelId = payload;
    },
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;