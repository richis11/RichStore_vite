import React, { useContext, useEffect } from "react";
import App from "./App";
import Login from "./components/Login";
import { UserContext } from "./context/UserContext";

function parseJwt(token) {
  try {
    // Dividir el token en sus partes y decodificar la carga útil
    const base64Payload = token.split(".")[1];
    // Reemplazar caracteres no URL-friendly y decodificar Base64
    const payload = atob(base64Payload.replace(/-/g, "+").replace(/_/g, "/"));
    // Parsear el JSON resultante
    return JSON.parse(payload);
  } catch (e) {
    console.error("Error parsing JWT", e);
    return null;
  }
}

//______________________________________________
function Spawn() {
  const { SetUser } = useContext(UserContext);
  const token = localStorage.getItem("token");
  let tokenExistAndIsValid = true;


  useEffect(() => {
    

    if (token) {
      tokenExistAndIsValid =
        parseJwt(localStorage.getItem("token")).exp * 1000 > Date.now();
      console.log("existe un token");

        const userid = parseJwt(token).userid
        const username = parseJwt(token).username
        const role = parseJwt(token).role

        const user = {userid, username, role}

      SetUser(user)

      
      
    } else {
      console.log("no existe ningun token");
     
    }
  }, []);

  // function setToken(e) {
  //   const token = window.prompt(
  //     "token",
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hY2NvdW50IjoiNjgwMGEzNDMtOGI2Ni00NWY0LTgyOGMtYmNmOTA2ZDdkZmIxIiwiaWRfcm9sZSI6MTAwLCJyb2xlX25hbWUiOiJERVYiLCJpZF9zdGF0dXMiOjIwMCwic3RhdHVzX25hbWUiOiJBY3RpdmEiLCJ1c2VybmFtZSI6ImRldiIsIm5hbWUiOiJEZXZlbG9wZXIgTm9haCIsInNwZWNpYWxpdHkiOiJXZWIgRGV2ZWxvcG1lbnQiLCJjcmVhdGVkX2F0IjoiMjAyMy0wMS0yM1QyMToxOTozNS4yNDFaIiwiaWF0IjoxNjc0NTMxNDYwfQ.njcX1lnko9b-qMyE22H-CSMb92B-6YGogZooQNIfaes"
  //   );

  //   if (!token) return;

  //   localStorage.setItem("token", token);
  // }

  // setToken()
  //let tokenExistAndIsValid = true
  //
  //----------------------------------------------
  return (
    <>
      {!tokenExistAndIsValid ? <App /> : <Login />}
      {/* <App /> */}
    
      
    </>)
}

export default Spawn;
