import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Sender = "user" | "operator";
export type Message = { sender: Sender | "operator"; text: string };

interface ChatState {
  messages: Message[];
}

const initialState: ChatState = { messages: [] };

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
  },
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;
