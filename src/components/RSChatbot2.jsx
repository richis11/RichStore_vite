// src/components/ChatComponent.js
import React, { useState } from "react";
import ChatBot from "react-simple-chatbot";
import { Button } from "react-bootstrap";
import "./styles.css";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

import { ThemeProvider } from "styled-components";

// TEMA PAL CHATBOT
const theme = {
  background: "#f5f8fb",
  //fontFamily: 'Helvetica Neue',
  headerBgColor: "#323232",
  headerFontColor: "#fff",
  headerFontSize: "15px",
  botBubbleColor: "#323232",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a",
};

const ResponseComponent = ({ steps, triggerNextStep }) => {
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState("");
  const { user } = useContext(UserContext);

  const fetchResponse = async () => {
    const userInput = steps.userInput.value;
    try {
      console.log(
        JSON.stringify({
          texto: userInput,
          user: user.username,
          userid: user.userid,
        })
      );

      //const res = await fetch("http://localhost:5000/api/generate", {
        const res = await fetch('https://richard11.pythonanywhere.com/api/generate', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          texto: userInput,
          user: user.username,
          userid: user.userid,
        }),
      });
      const data = await res.json();
      setResponse(data.result);
      setLoading(false);
      triggerNextStep();
    } catch (error) {
      console.error(error);
      setResponse("Lo siento, hubo un error. Por favor, inténtalo de nuevo.");
      setLoading(false);
      triggerNextStep();
    }
  };

  React.useEffect(() => {
    fetchResponse();
  }, []);

  return (
    <div
      style={{ borderRadius: "10pt", background: "#323232", color: "white" }}
    >
      <div style={{ margin: "10pt" }}>
        {loading ? "Escribiendo..." : response}
      </div>
    </div>
  );
};

const ChatComponent = () => {
  const [chatVisible, setChatVisible] = useState(false);
  const { user } = useContext(UserContext);
  const steps = [
    {
      id: "1",
      message: "¡Hola " + user.username + " ¿En qué puedo ayudarte hoy?",
      trigger: "userInput",
    },
    {
      id: "userInput",
      user: true,
      trigger: "getResponse",
    },
    {
      id: "getResponse",
      component: <ResponseComponent />,
      waitAction: true,
      trigger: "userInput",
    },
  ];

  return (
    <>
      <Button
        onClick={() => setChatVisible(!chatVisible)}
        className="chat-toggle-button2"
        variant="dark"
      >
        Chat <i className="bi bi-robot"></i>
      </Button>
      <div className={`chat-container ${chatVisible ? "" : "chat-hidden"}`}>
        <ThemeProvider theme={theme}>
          <ChatBot
            steps={steps}
            botDelay={200}
            userDelay={200}
            customDelay={200}
            headerTitle="RS ChatBot"
          />
        </ThemeProvider>
      </div>
    </>
  );
};

export default ChatComponent;
