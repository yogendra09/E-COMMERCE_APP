import { createContext, useEffect } from "react";
import PropTypes from 'prop-types';
export const SocketContext = createContext();
import { io } from "socket.io-client";
import { BASE_URL } from "../constants/apiUrl";
const socket = io(BASE_URL);
const SocketProvider = ({ children }) => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected to server");
    });

    socket.on("db_connected", ({message}) => {
      console.log("New message received:", message);
    });

    socket.on("disconnect", () => {
      console.log("disconnected from server");
    });
  });

  return (
    <>
      <SocketContext.Provider value={{ socket }}>
        {children}
      </SocketContext.Provider>
    </>
  );
};
SocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SocketProvider;
