import { React, useEffect, useState } from "react";
import {
  Card,
  Form,
  Modal,
  Row,
  Col,
  Button,
  Container,
  CloseButton,
} from "react-bootstrap";
import cliente_service from "../services/cliente_service";
import user_service from "../services/user_service";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidV4 } from "uuid";

function Sign_in({ setShowSign_in }) {
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

  const [flags, SetFlags] = useState({
    error_nombres: false,
    error_cedula: false,
    error_telefono: false,
    error_direccion: false,
    error_username: false,
    error_email: false,
    error_password: false,
    error_repeatpassword: false,
  });
  const reiniciarflags = () => {
    SetFlags({
      error_nombres: false,
      error_cedula: false,
      error_telefono: false,
      error_direccion: false,
      error_username: false,
      error_email: false,
      error_password: false,
      error_repeatpassword: false,
    });
  };

  const validarFormulario = () => {
    // Inicializar todos los flags de error como false
    let nuevosFlags = {
      error_nombres: false,
      error_cedula: false,
      error_telefono: false,
      error_direccion: false,
      error_username: false,
      error_email: false,
      error_password: false,
      error_repeatpassword: false,
    };

    // Validaciones
    nuevosFlags.error_username =
      user.username === "" || user.username.length < 4;
    nuevosFlags.error_password =
      user.password === "" || !validarPassword(user.password);
    nuevosFlags.error_repeatpassword = user.password !== user.repeatpassword;
    nuevosFlags.error_email = !validarEmail(cliente.email);
    // Añade más validaciones según sea necesario
    nuevosFlags.error_nombres =
      cliente.nombres === "" || cliente.nombres.length < 4;
    nuevosFlags.error_cedula =
      cliente.cedula === "" || cliente.cedula.length != 10;
    nuevosFlags.error_telefono =
      cliente.telefono === "" || cliente.telefono.length != 10;
    nuevosFlags.error_direccion =
      cliente.direccion === "" || cliente.direccion.length < 4;

    // Retorna los flags actualizados
    return nuevosFlags;
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
  const handleChangeNombres = (e) => {
    const { value, name } = e.target;
    if ((name === "nombres" && soloLetras(value)) || value === "") {
      SetCliente({ ...cliente, [e.target.name]: e.target.value });
    }
  };

  const handleChangeCedulaYtelefono = (e) => {
    const { value, name } = e.target;
    if (
      (((name === "cedula" || name === "telefono") && soloNumeros(value)) ||
        value === "") &&
      value.length <= 10
    ) {
      SetCliente({ ...cliente, [e.target.name]: e.target.value });
    }
  };

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Esta es una expresión regular básica para validación de email
    return regex.test(email);
  };
  const validarPassword = (password) => {
    const regex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
    );
    return regex.test(password);
  };

  //___________________________________ SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    let nuevosFlags = validarFormulario();
    SetFlags(nuevosFlags); // Actualiza el estado con los nuevos flags de error

    // Verificar si hay algún error
    let hayError = Object.values(nuevosFlags).some((estado) => estado);

    if (!hayError) {
      // No hay errores, proceder con la creación del usuario y cliente
      await crearUser(user);
      await crearCliente(cliente);
      // Mostrar mensaje de éxito
      Swal.fire({
        title: "CUENTA CREADA!",
        text: "La cuenta ha sido creada con éxito!",
        icon: "success",
        timer: 2000,
      });
      handleClose(); // Cierra el modal o limpia el formulario
    } else {
      // Hay errores, mostrar los mensajes de error adecuados
      // Ejemplo: usando toast para mostrar el primer error encontrado
      for (const key in nuevosFlags) {
        if (nuevosFlags[key]) {
          //const mensaje = obtenerMensajeError(key); // Función que debes definir para mapear keys de flags a mensajes
          toast.warn("Corrige las casillas marcadas", { autoClose: 1500 });
          break; // Sal del bucle después de encontrar el primer error
        }
      }
    }
  };

  //validación de datos
  //   if (
  //     user.username === "" ||
  //     user.password === "" ||
  //     user.repeatpassword === "" ||
  //     cliente.cedula === "" ||
  //     cliente.nombres === "" ||
  //     cliente.telefono === "" ||
  //     cliente.email === "" ||
  //     cliente.direccion === ""
  //   ) {
  //     toast.warn("Todos Los campos son obligatorios", { autoClose: 1500 });
  //   } else {
  //     if (!validarEmail(cliente.email)) {
  //       toast.warn("Email NO VÁLIDO!", { autoClose: 1500 });
  //       SetFlags({error_email:true})
  //       console.log("email NO valido");
  //     } else {
  //       SetFlags({error_email:false})
  //       if (user.password !== user.repeatpassword) {
  //         toast.warn("Los password no coinciden!", { autoClose: 1500 });
  //         SetFlags({error_password:true, error_repeatpassword:true})
  //       } else {
  //         SetFlags({error_password:false, error_repeatpassword:false})
  //         //CREAR USER Y CLIENTE
  //         await crearUser(user);
  //         await crearCliente(cliente);
  //         Swal.fire({
  //           title: "CUENTA CREADA!",
  //           text: "La cuenta ha sido creada con éxito!",
  //           icon: "success",
  //           showConfirmButton: false,
  //           timer: "2000",
  //         });
  //         //vaciar cliente y user
  //         handleClose();
  //       }
  //     }
  //   }
  // };

  const handleClose = () => {
    vaciarEstadoUser_y_cliente();
    reiniciarflags();
    setShowSign_in(false);
  };

  function soloLetras(texto) {
    return /^[a-zA-Z\s]+$/.test(texto); // Retorna true si el texto solo contiene letras (y espacios)
  }

  function soloNumeros(texto) {
    return /^\d+$/.test(texto); // Retorna true si el texto solo contiene números
  }

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ height: "90vh" }}
      >
        <Card>
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
                <Form.Label>Nombre y Apellido</Form.Label>
                <Form.Control
                  name="nombres"
                  onChange={handleChangeNombres}
                  value={cliente.nombres}
                ></Form.Control>
                {flags.error_nombres ? (
                  <Card.Text name="error_nombres" style={{ color: "red" }}>
                    Nombres no válidos
                  </Card.Text>
                ) : (
                  <></>
                )}
              </Col>

              <Col>
                <Form.Label>#Cédula</Form.Label>
                <Form.Control
                  name="cedula"
                  onChange={handleChangeCedulaYtelefono}
                  value={cliente.cedula}
                ></Form.Control>
                {flags.error_cedula ? (
                  <Card.Text name="error_cedula" style={{ color: "red" }}>
                    Cédula no válida
                  </Card.Text>
                ) : (
                  <></>
                )}
              </Col>

              <Col>
                <Form.Label>#Teléfono</Form.Label>
                <Form.Control
                  name="telefono"
                  onChange={handleChangeCedulaYtelefono}
                  value={cliente.telefono}
                ></Form.Control>
                {flags.error_telefono ? (
                  <Card.Text name="error_telefono" style={{ color: "red" }}>
                    Teléfono no válido
                  </Card.Text>
                ) : (
                  <></>
                )}
              </Col>
            </Row>

            <Form.Label>Dirección</Form.Label>
            <Form.Control
              name="direccion"
              onChange={handleChange}
              value={cliente.direccion}
            ></Form.Control>
            {flags.error_direccion ? (
              <Card.Text name="error_direccion" style={{ color: "red" }}>
                Dirección no válida
              </Card.Text>
            ) : (
              <></>
            )}

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
                {flags.error_username ? (
                  <Card.Text name="error_username" style={{ color: "red" }}>
                    Username no válido, Min. 4 caracteres
                  </Card.Text>
                ) : (
                  <></>
                )}
              </Col>
              <Col>
                <Form.Label>@Email</Form.Label>
                <Form.Control
                  name="email"
                  onChange={handleEmail}
                  value={cliente.email}
                ></Form.Control>
                {flags.error_email ? (
                  <Card.Text name="error_email" style={{ color: "red" }}>
                    Email no válido
                  </Card.Text>
                ) : (
                  <></>
                )}
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
                {flags.error_password ? (
                  <Card.Text name="error_password" style={{ color: "red" }}>
                    Min. 8 caracteres con mayusc. minusc. numeros y símbolos
                  </Card.Text>
                ) : (
                  <></>
                )}
              </Col>
              <Col>
                <Form.Label>Repeat Password</Form.Label>
                <Form.Control
                  name="repeatpassword"
                  onChange={handleChangeUser}
                  value={user.repeatpassword}
                ></Form.Control>
                {flags.error_repeatpassword ? (
                  <Card.Text
                    name="error_repeatpassword"
                    style={{ color: "red" }}
                  >
                    Las contraseñas no son iguales
                  </Card.Text>
                ) : (
                  <></>
                )}
              </Col>
            </Row>
          </Card.Body>

          <Card.Footer style={{ textAlign: "right" }}>
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
