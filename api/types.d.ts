export interface IMessage {
    author: string;
    message: string;
    id: string;
    datetime: string;
}

export type IMessageMutation = Omit<IMessage, 'id', 'datetime'>;