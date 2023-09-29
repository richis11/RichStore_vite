// src/components/ChatComponent.js
import React, { useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import { Button } from 'react-bootstrap';
import './styles.css';


const ResponseComponent = ({ steps, triggerNextStep }) => {
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState('');

  const fetchResponse = async () => {
    const userInput = steps.userInput.value;
    try {
      const res = await fetch('http://localhost:3001/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto: userInput }),
      });
      const data = await res.json();
      setResponse(data.result);
      setLoading(false);
      triggerNextStep();
    } catch (error) {
      console.error(error);
      setResponse('Lo siento, hubo un error. Por favor, inténtalo de nuevo.');
      setLoading(false);
      triggerNextStep();
    }
  };

  React.useEffect(() => {
    fetchResponse();
  }, []);

  return (
    <div>
      {loading ? 'Escribiendo...' : response}
    </div>
  );
};

const ChatComponent = () => {
    const [chatVisible, setChatVisible] = useState(false);

  const steps = [
    {
      id: '1',
      message: '¡Hola! ¿En qué puedo ayudarte hoy?',
      trigger: 'userInput',
    },
    {
      id: 'userInput',
      user: true,
      trigger: 'getResponse',
    },
    {
      id: 'getResponse',
      component: <ResponseComponent />,
      waitAction: true,
      trigger: 'userInput',
    },
  ];

  return (
    <>
      <Button
        onClick={() => setChatVisible(!chatVisible)}
        className="chat-toggle-button"
      >
        Chat <i className="bi bi-robot"></i>
      </Button>
      <div className={`chat-container ${chatVisible ? '' : 'chat-hidden'}`}>
        <ChatBot
          steps={steps}
          botDelay={200}
          userDelay={200}
          customDelay={200}
          headerTitle="ChatBot"
        />
      </div>
    </>
  );
};

export default ChatComponent;
