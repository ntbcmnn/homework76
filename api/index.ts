import express from 'express';
import cors from 'cors';
import messagesRouter from './routers/messages';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use('/', messagesRouter);

const run: () => Promise<void> = async () => {
    app.listen(port, () => {
        console.log(`Listening on port http://localhost:${port}`);
    });
};

run().catch((err) => {
    console.error(err);
});