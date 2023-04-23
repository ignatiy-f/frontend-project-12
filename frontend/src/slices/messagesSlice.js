import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channelsSlice';

const messagesAdapter = createEntityAdapter();

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    addMessages: messagesAdapter.addMany,
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder.addCase(channelsActions.removeChannel, (state, { payload }) => {
      const allEntities = Object.values(state.entities);
      const restEntities = allEntities.filter((e) => e.channelId !== payload.id);
      messagesAdapter.setAll(state, restEntities);
    });
  },
});

export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export const { actions } = messagesSlice;
export default messagesSlice.reducer;