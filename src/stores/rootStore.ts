import { observable, action } from "mobx";
import socket from "../config/socket";

class RootStore {
    constructor() {
        this.socket.connect();
        
        this.socket.on("connect", () => {
            console.log("socket connected!");
            this.connected = true;
        });

        this.socket.on("connect_error", () => {
            console.log("connection error");
        });

        this.socket.on("reconnecting", () => {
            console.log("reconnecting...");
        })

        this.socket.on("disconnect", () => {
            console.log("socket disconnected!");
            this.connected = false;
        });
        
        this.socket.on("messages", (messages: Array<string>) => {
            this.updateMessages(messages);
        });
    }

    @observable socket: SocketIOClient.Socket = socket;
    @observable connected: boolean = false;
    @observable messages: Array<string> = [];

    @action sendMessage = (message: string) => {
        this.socket.emit("message", message);
    }

    @action updateMessages = (messages: Array<string>) => {
        this.messages = messages;
    }
}

export default RootStore;
