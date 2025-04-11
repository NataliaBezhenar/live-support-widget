import type { Message } from "./store/chatSlice";

export let socket: WebSocket;

export const connectWebSocket = (onMessage: (data: Message) => void) => {
  socket = new WebSocket("ws://localhost:3001");

  socket.onopen = () => {
    console.log("Websocket connected");
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };

  socket.onclose = () => {
    console.log("Websocket disconnected");
  };
};

export const sendMessage = (text: string) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({ sender: "user", text }));
  }
};
