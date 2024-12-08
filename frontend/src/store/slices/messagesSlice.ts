import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMessage } from '../../types';
import { RootState } from '../../app/store.ts';
import { createMessage, fetchMessages, getMessagesByDate } from '../thunks/messagesThunk.ts';

interface IMessagesState {
  messages: IMessage[];
  fetching: boolean;
  creating: boolean;
  error: boolean;
}

const initialState: IMessagesState = {
  messages: [],
  fetching: false,
  creating: false,
  error: false,
};

export const selectFetchLoading = (state: RootState) => state.messages.fetching;
export const selectCreateLoading = (state: RootState) => state.messages.creating;
export const selectMessages = (state: RootState) => state.messages.messages;

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.fetching = true;
        state.error = false;
      })
      .addCase(fetchMessages.fulfilled, (state, action: PayloadAction<IMessage[]>) => {
        state.fetching = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.fetching = false;
        state.error = true;
      })
      .addCase(createMessage.pending, (state) => {
        state.creating = true;
        state.error = false;
      })
      .addCase(createMessage.fulfilled, (state) => {
        state.creating = false;
      })
      .addCase(createMessage.rejected, (state) => {
        state.creating = false;
        state.error = true;
      })
      .addCase(getMessagesByDate.pending, (state) =>{
        state.fetching = true;
        state.error = false;
      })
      .addCase(getMessagesByDate.fulfilled, (state, action: PayloadAction<IMessage[]>) =>{
        state.fetching = false;
        state.messages = action.payload;
      })
      .addCase(getMessagesByDate.rejected, (state) =>{
        state.fetching = false;
        state.error = true;
      });
  }
});

export const messagesReducer = messagesSlice.reducer;