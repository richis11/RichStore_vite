import { React, useEffect, useState } from "react";
import {
  Card,
  Form,
  Modal,
  Row,
  Col,
  Button,
  Container, CloseButton
} from "react-bootstrap";
import cliente_service from "../services/cliente_service";
import user_service from "../services/user_service";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidV4 } from "uuid";

function Sign_in({setShowSign_in}) {
let useruuid = "U-" + uuidV4();
  const [cliente, SetCliente] = useState({
    userid: useruuid,
    cedula: "",
    nombres: "",
    telefono: "",
    email: "",
    direccion: "",
  });
  const [user, SetUser] = useState({
    userid: useruuid,
    username: "",
    password: "",
    repeatpassword: "",
    email: "",
    role: "cliente",
    estado: "Activo",
    created_at: "",
    updated_at: "",
  });
  const vaciarEstadoUser_y_cliente = () => {
    let useruuid = "U-" + uuidV4();
    
    SetUser({
      userid: useruuid,
      username: "",
      password: "",
      repeatpassword: "",
      email: "",
      role: "cliente",
      estado: "Activo",
      created_at: "",
      updated_at: "",
    });

    SetCliente({
        userid: useruuid,
        cedula: "",
        nombres: "",
        telefono: "",
        email: "",
        direccion: "",
      });
  };

  // llamar funciones de services
  const crearCliente = async (cliente) => {
    await cliente_service.crearCliente(cliente);
  };
  const crearUser = async (user) => {
    await user_service.crearUser(user);
  };

  //HANDLERS
  const handleChange = (e) => {
    SetCliente({ ...cliente, [e.target.name]: e.target.value });
  };
  const handleChangeUser = (e) => {
    SetUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleEmail = (e) => {
    SetCliente({ ...cliente, [e.target.name]: e.target.value });
    SetUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //validación de datos
    if (
      user.username === "" ||
      user.password === "" ||
      user.repeatpassword === "" ||
      cliente.cedula === "" ||
      cliente.nombres === "" ||
      cliente.telefono === "" ||
      cliente.email === "" ||
      cliente.direccion === ""
    ) {
      toast.warn("Todos Los campos son obligatorios", { autoClose: 1500 });
    } else {
      if (user.password !== user.repeatpassword) {
        toast.warn("Los password no coinciden!", { autoClose: 1500 });
      } else {
        //CREAR USER Y CLIENTE
        await crearUser(user);
        await crearCliente(cliente);
        Swal.fire({
          title: "CUENTA CREADA!",
          text: "La cuenta ha sido creada con éxito!",
          icon: "success",
          showConfirmButton: false,
          timer: "2000",
        });
        //vaciar cliente y user
        handleClose();
      }
    }
  };

  const handleClose = () => {
    vaciarEstadoUser_y_cliente();
    setShowSign_in(false)
  };

  return (
    <>
  
      <Container className="d-flex align-items-center justify-content-center"
          style={{ height: "90vh" }}>
        <Card >
          <Card.Header>
            <Card.Title>CREAR CUENTA NUEVA</Card.Title>

            <CloseButton
              onClick={() => {
                setShowSign_in(false);
              }}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
              }}
            />
          </Card.Header>

          <Card.Body>
            <Row>

              <Col sm={6}>
                <Form.Label>Nombres</Form.Label>
                <Form.Control
                  name="nombres"
                  onChange={handleChange}
                  value={cliente.nombres}
                ></Form.Control>
              </Col>

              <Col>
                <Form.Label>#Cédula</Form.Label>
                <Form.Control
                  name="cedula"
                  onChange={handleChange}
                  value={cliente.cedula}
                ></Form.Control>
              </Col>

              <Col>
                <Form.Label>#Teléfono</Form.Label>
                <Form.Control
                  name="telefono"
                  onChange={handleChange}
                  value={cliente.telefono}
                ></Form.Control>
              </Col>
            </Row>

            <Form.Label>Dirección</Form.Label>
            <Form.Control
              name="direccion"
              onChange={handleChange}
              value={cliente.direccion}
            ></Form.Control>
            <br />
            <hr />

            <Row>
              <Col>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  name="username"
                  onChange={handleChangeUser}
                  value={user.username}
                ></Form.Control>
              </Col>
              <Col>
                <Form.Label>@Email</Form.Label>
                <Form.Control
                  name="email"
                  onChange={handleEmail}
                  value={cliente.email}
                ></Form.Control>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  onChange={handleChangeUser}
                  value={user.password}
                ></Form.Control>
              </Col>
              <Col>
                <Form.Label>Repeat Password</Form.Label>
                <Form.Control
                  name="repeatpassword"
                  onChange={handleChangeUser}
                  value={user.repeatpassword}
                ></Form.Control>
              </Col>
            </Row>
          </Card.Body>

          <Card.Footer style={{ textAlign: 'right' }}>
            <Button variant="primary" onClick={handleSubmit}>
              Crear cuenta
            </Button>
          </Card.Footer>
        </Card>
      </Container>

      <ToastContainer />
    </>
  );
}

export default Sign_in;
