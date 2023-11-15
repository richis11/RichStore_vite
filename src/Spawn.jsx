import React from "react";
import App from "./App";
import Login from "./components/Login";


function parseJwt(token) {
    try {
        // Dividir el token en sus partes y decodificar la carga útil
        const base64Payload = token.split('.')[1];
        // Reemplazar caracteres no URL-friendly y decodificar Base64
        const payload = atob(base64Payload.replace(/-/g, '+').replace(/_/g, '/'));
        // Parsear el JSON resultante
        return JSON.parse(payload);
    } catch (e) {
        console.error("Error parsing JWT", e);
        return null;
    }
  }


//______________________________________________
function Spawn() {

    let tokenExistAndIsValid = (parseJwt(localStorage.getItem('token')).exp*1000 > Date.now()) 



//----------------------------------------------
  return (
    <>
        {tokenExistAndIsValid ? <App />:<Login />}  
    </>
  );
}

export default Spawn;
