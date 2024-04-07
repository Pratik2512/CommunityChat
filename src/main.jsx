import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./Context/AuthContext";
import { RoomProvider } from "./Context/RoomContext";
import { ScreenProvider } from "./Context/ScreenContext";
import { BrowserRouter } from 'react-router-dom'
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RoomProvider>
        <ScreenProvider>

          <BrowserRouter>
            <App />
          </BrowserRouter>
          
        </ScreenProvider>
      </RoomProvider>
    </AuthProvider>
  </React.StrictMode>
);
