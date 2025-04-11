import React from "react";
import { ChatWindow } from "./components/ChatWindow";

const App: React.FC = () => {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 400,
        margin: "0 auto",
        paddingTop: "50px",
      }}
    >
      <ChatWindow />
    </div>
  );
};

export default App;
