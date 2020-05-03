"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**----------------------------------------------------------------------------
 * @class   SocketConnection
 * ----------------------------------------------------------------------------
 * Helper to be able to leverage websocket communication
 * @author  Kip Price
 * @version 1.0.1
 * ----------------------------------------------------------------------------
 */
class _SocketConnection {
    set onMessageReceived(f) { this._onMessageReceived = f; }
    get sharedToken() { return this._sharedToken; }
    get id() { return this._id; }
    //#endregion
    //.....................
    //.................................
    //#region CREATE THE WEB SOCKET
    /**
     * newConnection
     * ---------------------------------------------------------------------------
     * Generate the listener that will implement the WebSocket API
     */
    newConnection(serverUrl, sharedToken) {
        this._serverUrl = serverUrl;
        this._sharedToken = sharedToken;
        this._ws = new WebSocket(this._buildUrl());
        this.addConnectionListeners();
        this._connected = false;
        this._queuedMessages = [];
    }
    /**
     * _buildUrl
     * ----------------------------------------------------------------------------
     * Generate the appropriate URL for this socket
     */
    _buildUrl() {
        let url = this._serverUrl;
        let token = this._sharedToken;
        if (!token) {
            return url;
        }
        if (url.indexOf("?") !== -1) {
            url += "&";
        }
        else {
            url += "?";
        }
        url += "token=";
        url += token;
        return url;
    }
    /**
     * addConnectionListeners
     * ---------------------------------------------------------------------------
     * Ensure we're tracking when the connection opens, closes, and receives
     * additional messages
     */
    addConnectionListeners() {
        this._ws.addEventListener("open", () => {
            this._connected = true;
            // send queued messages if we have any
            this._sendQueuedMessages();
        });
        this._ws.addEventListener("close", () => {
            this._connected = false;
        });
        this._ws.addEventListener("message", (e) => {
            if (!e || !e.data) {
                return;
            }
            let incomingMsg = JSON.parse(e.data);
            if (incomingMsg.MsgType === "init") {
                this._sharedToken = incomingMsg.Token;
                this._id = incomingMsg.Message.Id;
                return;
            }
            if (!this._onMessageReceived) {
                return;
            }
            this._onMessageReceived(incomingMsg.MsgType, incomingMsg.Message, incomingMsg.Sender);
        });
        window.addEventListener("beforeunload", () => {
            if (!this._ws) {
                return;
            }
            this._ws.close();
            // reregister in a second in case the user cancels
            window.setTimeout(() => {
                this._ws = new WebSocket(this._serverUrl);
            }, 1000);
        });
    }
    //#endregion
    //.................................
    //........................
    //#region SEND MESSAGES
    /**
     * sendMessage
     * ---------------------------------------------------------------------------
     * Let the server know about something
     */
    sendMessage(msg) {
        if (this._connected) {
            this._ws.send(JSON.stringify(msg));
        }
        else {
            this._queueMessage(msg);
        }
    }
    /**
     * _queueMessage
     * ---------------------------------------------------------------------------
     * If the connection isn't currently active, queue up the message for later
     */
    _queueMessage(msg) {
        this._queuedMessages.push(msg);
    }
    /**
     * _sendQueuedMessages
     * ---------------------------------------------------------------------------
     * Send all messages that we had queued up for later once we are connected
     * again
     */
    _sendQueuedMessages() {
        if (this._queuedMessages.length > 0) {
            for (let m of this._queuedMessages) {
                this.sendMessage(m);
            }
            this._queuedMessages = [];
        }
    }
    //#endregion
    //........................
    //....................................
    //#region ALLOW CALLERS TO GET EVENTS
    addEventListener(type, callback) {
        this._ws.addEventListener(type, callback);
    }
}
exports.SocketConnection = new _SocketConnection();
