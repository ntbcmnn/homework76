import Grid from '@mui/material/Grid2';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectFetchLoading, selectMessages } from '../../store/slices/messagesSlice.ts';
import { IMessage, IMessageMutation } from '../../types';
import Message from '../../components/Message/Message.tsx';
import { useCallback, useEffect } from 'react';
import { createMessage, fetchMessages } from '../../store/thunks/messagesThunk.ts';
import { CircularProgress, Container, Typography } from '@mui/material';
import axiosApi from '../../axiosApi.ts';
import Form from '../../components/Form/Form.tsx';

const Messages = () => {
  const messages: IMessage[] = useAppSelector(selectMessages);
  const isLoading: boolean = useAppSelector(selectFetchLoading);
  const dispatch = useAppDispatch();

  const getMessages = useCallback(async () => {
    try {
      if (messages.length > 0) {
        const lastMessageDate = messages[messages.length - 1].datetime;
        return await axiosApi.get<IMessage[]>(`/messages?datetime=${lastMessageDate}`);
      }
    } catch (e) {
      console.error(e);
    }
  }, [messages]);

  useEffect(() => {
    const interval = setInterval(() => {
      void getMessages();
    }, 5000);

    if (messages.length === 0) {
      dispatch(fetchMessages());
    }

    return () => clearInterval(interval);
  }, [dispatch, getMessages, messages]);


  const onSubmit = async (message: IMessageMutation) => {
    await dispatch(createMessage(message));
    await dispatch(fetchMessages());
  };

  return (
    <>
      <Form onFormSubmit={onSubmit}/>

      <Grid style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '50px'
      }}>
        {isLoading ? <CircularProgress/> :
          <Container style={{marginTop: '50px', marginBottom: '50px'}}>
            <Grid>
              {messages.length !== 0 ?
                <>
                  {messages.map((message: IMessage) => (
                    <Message key={message.id} message={message}/>
                  ))}
                </> : <Typography>No messages found</Typography>
              }
            </Grid>
          </Container>
        }
      </Grid>
    </>
  );
};

export default Messages;