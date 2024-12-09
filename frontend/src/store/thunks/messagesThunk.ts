import { createAsyncThunk } from '@reduxjs/toolkit';
import { IMessage, IMessageMutation } from '../../types';
import axiosApi from '../../axiosApi.ts';

export const fetchMessages = createAsyncThunk<IMessage[], void>
('messages/fetchMessages',
  async () => {
    const response = await axiosApi.get<IMessage[]>('/messages');
    return response.data;
  }
);

export const createMessage = createAsyncThunk<void, IMessageMutation>(
  'messages/createMessage',
  async (message: IMessage) => {
    await axiosApi.post('/messages', {...message});
  }
);