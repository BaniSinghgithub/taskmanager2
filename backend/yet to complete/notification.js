const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

app.use(cors());
app.use(express.json());

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("pushNotification", (data) => {
    console.log("Received message:", data);
    io.emit("pushNotification", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

app.post("/send", (req, res) => {
  const { title, message } = req.body;

  if (!title || !message) {
    return res.status(400).send("Title and message are required!");
  }

  console.log("New message received:", { title, message });
//   io.emit("pushNotification", { title, message });

  res.status(200).send("Notification sent successfully");
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});


// for frontend

import { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import {toast,ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';  

const serverUrl = "http://localhost:5000";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [socket, setSocket] = useState(null);

  // Initialize WebSocket connection only once
  useEffect(() => {
    const newSocket = io(serverUrl);
    setSocket(newSocket);

    newSocket.on("pushNotification", async (data) => {
      console.log("📢 New notification received:", data);

      if(Notification.permission==="default" || Notification.permission==="denied"){
      const permission = await Notification.requestPermission();
      console.log("🔔 Notification permission status:", permission);
      if(permission!=="granted"){
        alert("Please allow notifications to display them");
      }
      else {
        new Notification("hello");
        console.log("✅ Notification displayed");
        alert("Notification displayed");
        toast.success(`Deadline Reminder: You are running late for`);  
      }
    }

      setNotifications((prev) => [...prev, data]);
    });

    // Cleanup function (placed correctly)
    return () => {
      newSocket.off("pushNotification");
      newSocket.disconnect();
      console.log("🛑 Socket disconnected");
    };
  }, []); // Empty dependency array ensures it runs only once

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !message) {
      alert("Title and message cannot be empty!");
      return;
    }

    try {
      await axios.post(`${serverUrl}/send`, { title, message });

      if (socket) {
        socket.emit("pushNotification", { title, message });
      }

      setTitle("");
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
}