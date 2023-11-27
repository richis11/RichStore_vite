import { React, useEffect, useState } from "react";
import {
  Table,
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import cliente_service from "../services/cliente_service";
import user_service from "../services/user_service";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidV4 } from "uuid";

//____________________________________________________________________________________
//_____________________________________________________________________________ CODEX

function AdmCLientes() {
  const [showModal, setShowModal] = useState(false);
  const [editar, SetEditar] = useState(false);
  const [clientes, SetClientes] = useState([]);
  const [cliente, SetCliente] = useState({
    userid: "",
    cedula: "",
    nombres: "",
    telefono: "",
    email: "",
    direccion: "",
  });
  const [user, SetUser] = useState({
    userid: "",
    username: "",
    password: "",
    //repeatpassword: "",
    email: "",
    role: "",
    estado: "",
    created_at: "",
    updated_at: "",
  });
  const vaciarEstadoUser = () => {
    SetUser({
      userid: "",
      username: "",
      password: "",
      //repeatpassword: "",
      email: "",
      role: "",
      estado: "",
      created_at: "",
      updated_at: "",
    });
  };


  useEffect(() => {
    getClientes();
  }, [user]);

  const vaciarEstadoCliente = () => {
    SetCliente({
      userid: "",
      cedula: "",
      nombres: "",
      telefono: "",
      email: "",
      direccion: "",
    });
  };

  // llamar funciones de services
  const getCliente = async (id) => {
    SetCliente(await cliente_service.getCliente(id));
  };

  const getClientes = async () => {
    let lista_clientes = await cliente_service.getClientes();
    SetClientes(lista_clientes.reverse());
  };

  const crearCliente = async (cliente) => {
    await cliente_service.crearCliente(cliente);
  };

  const crearUser = async (user) => {
    await user_service.crearUser(user);
  };

  const editarCliente = async (id, cliente) => {
    await cliente_service.editarCliente(id, cliente);
  };

  const eliminarCliente = async (id) => {
    await cliente_service.eliminarCliente(id);
  };

  //handlers
  const handleShow = (opc) => {
    if(opc){
      let useruuid = 'U-'+uuidV4();
      SetUser({ ...user, userid: useruuid, role:'cliente',estado:'Activo'})
      SetCliente({...cliente, userid: useruuid})
    }
    setShowModal(true)};
  const handleClose = () => {
    setShowModal(false);
    vaciarEstadoCliente();
    vaciarEstadoUser();
    SetEditar(false);
  };

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

  const handleEditar = (id) => {
    getCliente(id);
    SetEditar(true);
    handleShow();
  };

  const handleEliminar = async (id) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await eliminarCliente(id);
        getClientes();
        Swal.fire({
          title: "Eliminado!",
          text: "El cliente ha sido eliminado con éxito!",
          icon: "success",
          timer: "2000",
          showConfirmButton: false,
        });
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //validación de datos
    if (
      user.username === "" ||
      user.password === "" ||
      cliente.cedula === "" ||
      cliente.nombres === "" ||
      cliente.telefono === "" ||
      cliente.email === "" ||
      cliente.direccion === ""
    ) {
      toast.warn("Todos Los campos son obligatorios", { autoClose: 1500 });
    } else {
      if (!editar) {
        //CREAR USER Y CLIENTE
        //SetUser({ ...user, email: cliente.email });
        await crearUser(user)
        await crearCliente(cliente)
        getClientes();
        Swal.fire({ title: "CLIENTE AGREGADO",
        text: "El  cliente ha sido agregado con éxito!", icon: "success" , showConfirmButton: false, timer:'2000' });
      } else {
        // EDITAR CLIENTE
        await editarCliente(cliente.id, cliente);
        getClientes();
        Swal.fire({ title: "CLIENTE MODIFICADO", text: "El  cliente ha sido editado con éxito!", icon: "success" , showConfirmButton: false, timer:'2000' });
      }
      //ocultar modal y vaciar cliente
      handleClose();
    }
  };

  //__________________________________________________________________________________
  //----------------------------------------------------------------------------- HTML
  //__________________________________________________________________________________

  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col sm={9}>
            <h1>Administrar Clientes 👨‍👩‍👦‍👦</h1>
          </Col>

          <Col style={{ textAlign: "right" }}>
            <Button variant="success" onClick={handleShow}>
              Insertar <i className="bi bi-plus-circle"></i>
            </Button>
          </Col>
        </Row>
        <Row>
          <hr />
          {clientes.length !== 0 ? (
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Cédula</th>
                  <th>Nombres</th>
                  <th>Teléfono</th>
                  <th>Email</th>
                  <th>Dirección</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map((cliente) => (
                  <tr key={cliente.id}>
                    <td>{cliente.id}</td>
                    <td>{cliente.cedula}</td>
                    <td>{cliente.nombres}</td>
                    <td>{cliente.telefono}</td>
                    <td>{cliente.email}</td>
                    <td>{cliente.direccion}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => handleEditar(cliente.id)}
                      >
                        <i className="bi bi-pencil"></i>
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleEliminar(cliente.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <h1>No hay clientes para mostrar.</h1>
          )}
        </Row>
      </Container>

      {/* MODAL INSERTAR CLIENTES ------------------------------------------------- */}
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{!editar ? "Insertar" : "Modificar"} Cliente</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {!editar? <>
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              onChange={handleChangeUser}
              value={user.username}
            ></Form.Control>
            <Row>
              <Col>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  onChange={handleChangeUser}
                  value={user.password}
                ></Form.Control>
              </Col>
              {/* <Col>
                <Form.Label>Repeat Password</Form.Label>
                <Form.Control
                  name="repeatpassword"
                  onChange={handleChangeUser}
                  value={user.repeatpassword}
                ></Form.Control>
              </Col> */}
            </Row>
            </>
            : <></>}
            



            <Form.Label>#Cédula</Form.Label>
            <Form.Control
              name="cedula"
              onChange={handleChange}
              value={cliente.cedula}
            ></Form.Control>

            <Form.Label>Nombres</Form.Label>
            <Form.Control
              name="nombres"
              onChange={handleChange}
              value={cliente.nombres}
            ></Form.Control>

            <Form.Label>#Teléfono</Form.Label>
            <Form.Control
              name="telefono"
              onChange={handleChange}
              value={cliente.telefono}
            ></Form.Control>

            <Form.Label>@Email</Form.Label>
            <Form.Control
              name="email"
              onChange={handleEmail}
              value={cliente.email}
            ></Form.Control>

            <Form.Label>Dirección</Form.Label>
            <Form.Control
              name="direccion"
              onChange={handleChange}
              value={cliente.direccion}
            ></Form.Control>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <ToastContainer />
    </>
  );
}

export default AdmCLientes;
