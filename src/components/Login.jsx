import React, { useState, useContext } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Form,
  Nav,
  CloseButton,
} from "react-bootstrap";
import login_image from "../images/logintech.jpg";
import { NavLink } from "react-router-dom";
import login_service from "../services/login_service";
import App from "../App";
import { UserContext } from "../context/UserContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
function Login({ setShowLogin, setShowSign_in }) {
  const [username, SetUsername] = useState("");
  const [password, SetPassword] = useState("");
  const [loginSuccesful, SetLoginSuccesful] = useState(false);
  const { user, SetUser } = useContext(UserContext);
  const [usernotvalid, SetUsernotvalid] = useState(false);

  const handleKeyDown = (e) => {
    // Verificar si la tecla presionada es Enter
    if (e.key === "Enter") {
      // Aquí colocas la lógica que quieres ejecutar cuando se presione Enter
      handdleLogin(e);
    }
  };

  const handdleLogin = (e) => {
    e.preventDefault();
    console.log({ username: username, password: password });
    loginUser();
  };

  const loginUser = async (e) => {
    if (username === "" || password === "") {
      toast.warn("Todos Los campos son obligatorios", { autoClose: 1500 });
    } else {
      try {
        const result = await login_service.loginUser({ username, password });
        console.log("Datos enviados al server y respuesta recibida");

        // Dado que un éxito implica la recepción de un token, procedemos directamente.
        const token = result.data.token;
        localStorage.setItem("token", token);
        SetLoginSuccesful(true);

        // Extracción de datos del JWT.
        const decoded = parseJwt(token);
        const user = {
          userid: decoded.userid,
          username: decoded.username,
          role: decoded.role,
        };
        SetUser(user);

        console.log(decoded);
        SetUsernotvalid(false);
      } catch (error) {
        // Manejo de errores, incluyendo un 404.
        SetLoginSuccesful(false);
        //console.error("Error en la solicitud:", error);
        // Aquí puedes agregar lógica adicional para manejar diferentes tipos de errores.
        SetUsernotvalid(true);
      }
    }
  };

  //--------------------------------------
  return (
    <>
      {loginSuccesful ? (
        <App />
      ) : (
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ height: "90vh" }}
        >
          {/* Contenido */}
          <Card
            style={{
              width: "25rem",
              margin: "10px",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* <CloseButton
              onClick={() => {
                setShowLogin(false);
              }}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                zIndex: 1000, // Asegúrate de que este valor es mayor que el del Card
              }}
            /> */}
            <Button variant="dark" 
            onClick={() => {
              setShowLogin(false);
            }}
            style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                zIndex: 1000, // Asegúrate de que este valor es mayor que el del Card
              }}>X</Button>
            <Card.Img
              variant="top"
              src={login_image}
              alt="imagen LOGIN"
              style={{ height: "120pt", objectFit: "cover", zIndex: 1 }}
            />
            <Card.Body>
              <Row>
                <Col sm={8}>
                  <Card.Title>LOGIN</Card.Title>
                </Col>
              </Row>

              <Card.Text>Usuario</Card.Text>
              <Form.Control
                onChange={(e) => {
                  SetUsername(e.target.value);
                }}
                value={username}
              ></Form.Control>
              <Row>
                <Col>
                  <Card.Text>Contraseña</Card.Text>
                </Col>
                <Col>
                  {/* <Nav.Link
                    as={NavLink}
                    to="/olvidelacontraseña"
                    style={{ color: "#337DFF" }}
                  >
                    Olvidé mi contraseña
                  </Nav.Link> */}
                </Col>
              </Row>

              <Form.Control
                type="password"
                onChange={(e) => {
                  SetPassword(e.target.value);
                }}
                value={password}
                onKeyDown={handleKeyDown}
              ></Form.Control>

              {usernotvalid? <Card.Text style={{color:'red', textAlign:'center'}}>Usuario o contraseña incorrectos</Card.Text>:<br/>}
              <div
              // style={{
              //   marginTop: "12pt",
              //   marginRight: "12pt",
              //   display: "flex",
              //   justifyContent: "flex-end",
              //   alignItems: "center",
              // }}
              >
                
                <Row>
                  <Button onClick={handdleLogin}>Acceder</Button>
                </Row>
                <br />
                <Row>
                  <Col sm={7}>
                    <Card.Text>¿Aún no tienes una cuenta?</Card.Text>
                  </Col>
                  <Col>
                    <Nav.Link
                      style={{ color: "#337DFF" }}
                      onClick={() => {
                        setShowLogin(false);
                        setShowSign_in(true);
                      }}
                    >
                      Crear cuenta nueva
                    </Nav.Link>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
        </Container>
      )}
      <ToastContainer />
    </>
  );
}

export default Login;
