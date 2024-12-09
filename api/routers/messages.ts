import express from 'express';
import {IMessage, IMessageMutation} from '../types';
import fileDb from '../fileDb';

const messagesRouter = express.Router();

messagesRouter.get('/', async (req, res) => {
    try {
        const queryDate = req.query.datetime as string;

        if (queryDate) {
            const date = new Date(queryDate);

            if (isNaN(date.getDate())) {
                res.status(400).send({error: 'Invalid date'});
                return;
            }

            const messages: IMessage[] = await fileDb.getMessagesByDate(date);
            res.send(messages.length ? messages.slice(-30) : []);
        } else {
            const messages: IMessage[] = await fileDb.getMessages();
            res.send(messages.length ? messages.slice(-30) : []);
        }
    } catch (e) {
        console.error(e);
    }
});

messagesRouter.post('/', async (req, res) => {
    const message: IMessageMutation = {
        author: req.body.author,
        message: req.body.message
    };

    if (!message.author || !message.message || !message.author.trim().length || !message.message.trim().length) {
        res.status(400).send({error: 'Author and message are required and cannot be empty'});
        return;
    }

    const newMessage = await fileDb.addMessage(message);
    res.send(newMessage);
});

export default messagesRouter;