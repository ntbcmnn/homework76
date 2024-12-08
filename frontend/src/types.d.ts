export interface IMessage {
  id: string;
  author: string;
  message: string;
  datetime: string;
}

export type IMessageMutation = Omit<IMessage, 'id', 'datetime'>;