import {promises as fs} from 'fs';
import {IMessage, IMessageMutation} from "./types";
import crypto from "crypto";

const db = './db.json';
let data: IMessage[] = [];

const fileDb = {
    async init() {
        try {
            const fileContent = await fs.readFile(db);
            data = await JSON.parse(fileContent.toString()) as IMessage[];
        } catch (e) {
            console.error(e);
        }
    },

    async getMessages() {
        return data;
    },

    async getMessagesByDate(date: Date) {
        return data.filter((message: IMessage) => new Date(message.datetime) > date);
    },

    async addMessage(message: IMessageMutation) {
        try {
            const id = crypto.randomUUID();
            const datetime: string = new Date().toISOString();
            const newMessage = {id, datetime, ...message}

            data.push(newMessage);
            await this.save();
            return newMessage;
        } catch (e) {
            console.error(e);
        }
    },

    async save() {
        return fs.writeFile(db, JSON.stringify(data));
    }
};

export default fileDb;