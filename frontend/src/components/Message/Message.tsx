import { IMessage } from '../../types';
import React from 'react';
import Grid from '@mui/material/Grid2';
import dayjs from 'dayjs';
import { Card, CardContent, Typography } from '@mui/material';

interface Props {
  message: IMessage;
}

const Message: React.FC<Props> = ({message}) => {
  const formattedDate: string = dayjs(message.datetime).format('MMMM D, YYYY [at] HH:mm');

  return (
    <Grid size={{xs: 12, sm: 12, md: 6, lg: 4}} style={{marginTop: '20px'}}>
      <Card>
        <CardContent>
          <Typography
            variant="h4"
            style={{
              fontFamily: 'inherit',
              marginBottom: '20px'
            }}>
            {message.author}
          </Typography>

          <Typography
            variant="h6"
            style={{
              fontFamily: 'inherit',
              marginBottom: '20px'
            }}>
            {message.message}
          </Typography>

          <hr/>

          <Typography
            variant="subtitle2"
            style={{
              marginTop: '20px',
              color: 'gray',
              fontFamily: 'inherit'
            }}>
            {formattedDate}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Message;