import { OutgoingMessage, MessageReceivedFunc } from './_interfaces';
/**----------------------------------------------------------------------------
 * @class   SocketConnection
 * ----------------------------------------------------------------------------
 * Helper to be able to leverage websocket communication
 * @author  Kip Price
 * @version 1.0.1
 * ----------------------------------------------------------------------------
 */
declare class _SocketConnection {
    /** backing websocket */
    protected _ws: WebSocket;
    /** track whether this socket is connected currently */
    protected _connected: boolean;
    /** track any messages that should be sent, in cases where we aren't yet connected */
    protected _queuedMessages: OutgoingMessage[];
    /** allow the caller to override the behavior upon a message being received */
    protected _onMessageReceived: MessageReceivedFunc;
    set onMessageReceived(f: MessageReceivedFunc);
    /** allow changing of the server on the fly */
    protected _serverUrl: string;
    /** track the token that this connection belongs within */
    protected _sharedToken: string;
    get sharedToken(): string;
    /** unique identifier for this client websocket connection */
    protected _id: string;
    get id(): string;
    /**
     * newConnection
     * ---------------------------------------------------------------------------
     * Generate the listener that will implement the WebSocket API
     */
    newConnection(serverUrl: string, sharedToken: string): void;
    /**
     * _buildUrl
     * ----------------------------------------------------------------------------
     * Generate the appropriate URL for this socket
     */
    protected _buildUrl(): string;
    /**
     * addConnectionListeners
     * ---------------------------------------------------------------------------
     * Ensure we're tracking when the connection opens, closes, and receives
     * additional messages
     */
    private addConnectionListeners;
    /**
     * sendMessage
     * ---------------------------------------------------------------------------
     * Let the server know about something
     */
    sendMessage(msg: OutgoingMessage): void;
    /**
     * _queueMessage
     * ---------------------------------------------------------------------------
     * If the connection isn't currently active, queue up the message for later
     */
    protected _queueMessage(msg: OutgoingMessage): void;
    /**
     * _sendQueuedMessages
     * ---------------------------------------------------------------------------
     * Send all messages that we had queued up for later once we are connected
     * again
     */
    protected _sendQueuedMessages(): void;
    addEventListener(type: "open" | "close" | "error", callback: EventListener): void;
}
export declare const SocketConnection: _SocketConnection;
export {};
