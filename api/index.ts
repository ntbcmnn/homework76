import express from 'express';
import cors from 'cors';
import messagesRouter from './routers/messages';
import fileDb from "./fileDb";
import fs = require("fs");

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use('/messages', messagesRouter);

const run: () => Promise<void> = async () => {
    if (!fs.existsSync('./db.json')) {
        fs.writeFileSync('./db.json', JSON.stringify([]));
    }

    await fileDb.init();

    app.listen(port, () => {
        console.log(`Listening on port http://localhost:${port}`);
    });
};

run().catch((err) => {
    console.error(err);
});