/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalType: null,
  handledChannelId: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalType(state, { payload }) {
      state.modalType = payload;
    },
    setHandledChannelId(state, { payload }) {
      state.handledChannelId = payload;
    },
  },
});

export const { actions } = modalSlice;
export default modalSlice.reducer;