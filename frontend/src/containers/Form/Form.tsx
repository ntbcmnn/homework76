import Grid from '@mui/material/Grid2';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { CircularProgress, IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { selectCreateLoading } from '../../store/slices/messagesSlice.ts';
import { createMessage, fetchMessages } from '../../store/thunks/messagesThunk.ts';
import { IMessageMutation } from '../../types';
import { toast } from 'react-toastify';

const initialState = {
  author: '',
  message: '',
};

const Form = () => {
  const [form, setForm] = useState<IMessageMutation>({...initialState});
  const dispatch = useAppDispatch();
  const isCreating: boolean = useAppSelector(selectCreateLoading);

  const onSubmitForm: (e: React.FormEvent) => Promise<void> = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.author.trim().length === 0 || form.message.trim().length === 0) {
      toast.error('Fill out all fields.');
      return;
    }

    await dispatch(createMessage({...form}));
    setForm({...initialState});
    toast.success('Message added successfully!');
    dispatch(fetchMessages());
  };

  const onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm((prevState: IMessageMutation) => ({...prevState, [name]: value}));
  };

  return (
    <Grid style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '50px'
    }}>
      {isCreating ? <CircularProgress/> :
        <>
          <form onSubmit={onSubmitForm}>
            <Grid container direction="column" spacing={2}>
              <Grid size={{xs: 12}}>
                <TextField
                  id="author"
                  name="author"
                  label="Author"
                  value={form.author}
                  onChange={onInputChange}
                  required
                />
              </Grid>

              <Grid size={{xs: 12}}>
                <TextField
                  id="message"
                  name="message"
                  label="Message"
                  value={form.message}
                  onChange={onInputChange}
                  required
                  multiline
                  rows={4}
                />
              </Grid>

              <Grid style={{display: 'flex', justifyContent: 'center'}}>
                <IconButton type="submit" color="primary">
                  <SendIcon/>
                </IconButton>
              </Grid>
            </Grid>
          </form>
        </>
      }
    </Grid>
  );
};

export default Form;