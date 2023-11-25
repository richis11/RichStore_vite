import React from "react";
import { Card, Button } from "react-bootstrap";
//import bot from "../images/bot.jpg"
import ChatBot from 'react-simple-chatbot';

const steps = [
  {
      id: '0',
      message: 'Hola Crack!',

      // This calls the next id
      // i.e. id 1 in this case
      trigger: '1',
  }, {
      id: '1',

      // This message appears in
      // the bot chat bubble
      message: 'Como tu te llama?¿',
      trigger: '2'
  }, {
      id: '2',

      // Here we want the user
      // to enter input
      user: true,
      trigger: '3',
  }, {
      id: '3',
      message: " hola {previousValue}, como te puedo ayudar?",
      trigger: 4
  }, {
      id: '4',
      // options: [
           
      //     // When we need to show a number of
      //     // options to choose we create alist
      //     // like this
      //     // { value: 1, label: 'View Courses' },
      //     // { value: 2, label: 'Read Articles' },

      // ],
      user: true,
      trigger:5,
      
  },
  {id:'5',
message:"jajaj sin comentarios, hablamos."}
];
//____________________________________________________________________________________
//_____________________________________________________________________________ CODEX
function Chatbot() {






  //__________________________________________________________________________________
  //----------------------------------------------------------------------------- HTML
  //__________________________________________________________________________________

  return (
    <>
      {/* <Button>
        <i className="bi bi-robot"></i>
      </Button>

      <Card style={{ width: "5rem", margin: "10px" }}>
      <Card.Img variant="top" src={bot} alt="imagen producto" />
      </Card> */}

<div className="App">
            
            <ChatBot steps={steps} />
        </div>
    </>
  );
}

export default Chatbot;
