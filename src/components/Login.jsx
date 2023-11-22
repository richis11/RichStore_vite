import React, { useState, useContext } from "react";
import { Container, Card, Row, Col, Button, Form, Nav } from "react-bootstrap";
import login_image from "../images/logintech.jpg";
import { NavLink } from "react-router-dom";
import login_service from "../services/login_service";
import App from "../App";
import { UserContext } from "../context/UserContext";


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
function Login() {
const [username, SetUsername]= useState('')
const [password, SetPassword]= useState('')
const [loginSuccesful, SetLoginSuccesful]=useState(false)
const {user, SetUser } = useContext(UserContext);


const handdleLogin = (e) => {
    e.preventDefault();
    console.log({username : username,
    password: password})
    loginUser()
}

const loginUser = async (e) => {
  const result = await login_service.loginUser({username, password}).then(
  console.log('datos enviados al sever'))

  if (result.data.token){
    const token = result.data.token
    localStorage.setItem('token', token)
    SetLoginSuccesful(true)

    SetUser(parseJwt(token).username)


    console.log(parseJwt(token))
  }
  else{
    SetLoginSuccesful(false)
    console.log(result.data)
  }

  
};









  //-------------------------------------- 
  return (
  <>{loginSuccesful ? <App />: 
    <Container className="d-flex align-items-center justify-content-center"
        style={{ height: '90vh' }}>
          {/* Contenido */}
          <Card style={{ width: "25rem", margin: "10px"}} >
            <Card.Img variant="top" src={login_image} alt="imagen LOGIN" style={{height:"120pt", objectFit:"cover"}}/>

            <Card.Body>
              <Row>
                <Col sm={8}>
                  <Card.Title>LOGIN</Card.Title>
                </Col>
              </Row>

              <Card.Text>Usuario</Card.Text>
              <Form.Control onChange={(e)=>{SetUsername( e.target.value)}} value={username}></Form.Control>
              <Row>
                <Col>
                  <Card.Text>Contraseña</Card.Text>
                </Col>
                <Col>
                  <Nav.Link
                    as={NavLink}
                    to="/olvidelacontraseña"
                    style={{ color: "#337DFF" }}
                  >
                    Olvidé mi contraseña
                  </Nav.Link>
                </Col>
              </Row>

              <Form.Control type="password" onChange={(e)=>{SetPassword(e.target.value)}} value={password}></Form.Control>

              <div
                style={{
                  marginTop: "12pt",
                  marginRight: "12pt",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Row>
                  <Button
                    onClick={handdleLogin}
                  >
                    Acceder
                  </Button>
                </Row>
              </div>
            </Card.Body>
          </Card>
        </Container>}
    </> 
  );
}

export default Login;
