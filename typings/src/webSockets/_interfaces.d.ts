import { IDictionary } from "../objectHelpers/_interfaces";
export interface OutgoingMessage {
    MsgType: string;
    Message: IDictionary<string>;
    Target?: string;
}
export interface IncomingMessage {
    MsgType: string;
    Message: IDictionary<string>;
    Sender: string;
    Token: string;
}
export interface MessageReceivedFunc {
    (type: string, message: any, sender: string): void;
}
