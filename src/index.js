import React from "react";
import * as ReactDOMClient from "react-dom/client";
import ChatApp from "./chat/ChatApp.jsx";
import { AuthProvider } from "./chat/context/AuthContext.js";

const root = ReactDOMClient.createRoot(document.getElementById("app"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ChatApp />
    </AuthProvider>
  </React.StrictMode>
);
