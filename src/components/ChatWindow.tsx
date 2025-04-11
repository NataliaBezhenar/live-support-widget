import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import type { Message } from "../store/chatSlice";
import { RootState } from "../store";
import { addMessage } from "../store/chatSlice";
import { connectWebSocket, sendMessage } from "../websocket";

const Wrapper = styled.div`
  width: 100%;
  max-height: 300px;
  border: 1px solid #ccc;
  padding: 12px;
  box-sizing: border-box;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
`;

const Messages = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 10px;
`;

const Message = styled.div<{ sender: string }>`
  text-align: ${({ sender }) => (sender === "user" ? "right" : "left")};
  margin-bottom: 6px;
  color: ${({ sender }) => (sender === "user" ? "#1976d2" : "#444")};
`;

const InputRow = styled.form`
  display: flex;
`;

const Input = styled.input`
  flex: 1;
  padding: 6px;
  border: 1px solid #aaa;
  border-radius: 4px;
`;

const Button = styled.button`
  margin-left: 8px;
  padding: 6px 12px;
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
`;

export const ChatWindow: React.FC = () => {
  const [input, setInput] = useState("");
  const messages = useSelector((state: RootState) => state.chat.messages);
  const dispatch = useDispatch();

  useEffect(() => {
    connectWebSocket((data) => {
      dispatch(addMessage(data));
    });
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      sender: "user",
      text: input,
    };
    dispatch(addMessage(userMessage));
    sendMessage(input);
    setInput("");
  };

  return (
    <Wrapper>
      <Messages>
        {messages.map((msg, i) => (
          <Message key={i} sender={msg.sender}>
            {msg.text}
          </Message>
        ))}
      </Messages>
      <InputRow onSubmit={handleSubmit}>
        <Input
          type="text"
          value={input}
          placeholder="Type a message..."
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="submit">Send</Button>
      </InputRow>
    </Wrapper>
  );
};
