import { configureStore } from '@reduxjs/toolkit';
import channels from './channelsSlice';
import messages from './messagesSlice';
import modals from './modalSlice';

export default configureStore({
  reducer: {
    channels,
    messages,
    modals,
  },
});