import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unseenMessages, setUnseenMessages] = useState({});

  const { socket, axios } = useContext(AuthContext);

  const getUsers = async () => {
    try {      
      const { data } = await axios.get("/api/messages/users");
      
      if (data.success) {
        setUsers(data.users);
        setUnseenMessages(data.unseenMessages);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getMessages = async (userId) => {
    try {
      const { data } = await axios.get(`/api/messages/${userId}`);
      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const sendMessage = async (messageData) => {
    try {      
      const { data } = await axios.post(
        `/api/messages/send/${selectedUser._id}`,
        messageData
      );
      if (data.success) {
        setMessages((prevMsgs) => [...prevMsgs, data.newMessage]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const subscribeToMessages = useCallback(async () => {
    if(!socket) return;
    socket.on("newMessage", (newMessage)=> {
        if(selectedUser && newMessage.senderId=== selectedUser._id){
            newMessage.seen = true;
            setMessages((prevMsgs)=> [...prevMsgs, newMessage]);
            axios.put(`/api/messages/mark/${newMessage._id}`);
        }
        else {
            setUnseenMessages((prevUnseenMsgs)=> (
                {
                    ...prevUnseenMsgs, [newMessage.senderId] : prevUnseenMsgs[newMessage.senderId] ? (prevUnseenMsgs[newMessage.senderId] + 1): 1
                }
            ))
        }
    }) 
  }, [socket, selectedUser, axios])

  const unsubscribeFromMessages = useCallback(async () => {
    if(socket) socket.off("newMessage");
  }, [socket]);

  useEffect(() => {
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [socket, selectedUser, subscribeToMessages, unsubscribeFromMessages])

  const value = {
    messages,
    users,
    selectedUser,
    unseenMessages,
    getUsers,
    getMessages,
    sendMessage,
    setSelectedUser,
    setUnseenMessages
  };
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatContext;
