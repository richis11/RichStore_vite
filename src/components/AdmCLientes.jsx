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
import Swal from 'sweetalert2'
import {toast, ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

function AdmCLientes() {
  const [showModal, setShowModal] = useState(false);
  const [editar, SetEditar] = useState(false);
  const [clientes, SetClientes] = useState([]);
  const [cliente, SetCliente] = useState({
    cedula: "",
    nombres: "",
    telefono: "",
    email: "",
    direccion: "",
  });

  useEffect(() => {
    getClientes();
  }, []);

  const vaciarEstadoCliente = () => {
    SetCliente({
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
    let lista_clientes=await cliente_service.getClientes()
    SetClientes(lista_clientes.reverse());
  };

  const crearCliente = async (cliente) => {
    await cliente_service.crearCliente(cliente);
  };

  const editarCliente = async (id, cliente) => {
    await cliente_service.editarCliente(id, cliente);
  };

  const eliminarCliente = async (id) => {
    await cliente_service.eliminarCliente(id);
  };

  //handlers
  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    vaciarEstadoCliente();
    SetEditar(false);
  };

  const handleChange = (e) => {
    SetCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleEditar = (id) => {
    getCliente(id);
    SetEditar(true);
    handleShow();
  };

  const handleEliminar = async (id) => {
    await eliminarCliente(id);
    getClientes();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //validación de datos
    if (
      cliente.cedula === "" ||
      cliente.nombres === "" ||
      cliente.telefono === "" ||
      cliente.email === "" ||
      cliente.direccion === ""
    ) {
      toast.warn("Todos Los campos son obligatorios",{ autoClose: 1500 });
    } else {
      if (!editar) {
        //CREAR PRODUCTO
        await crearCliente(cliente);
        getClientes();
        Swal.fire({title:'CLIENTE CREADO EXITOSAMENTE', icon:'success'})
      } else {
        // EDITAR PRODUCTO
        await editarCliente(cliente.id, cliente);
        getClientes();
      }
      //ocultar modal y vaciar cliente
      handleClose();
    }
  };

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
        </Row>
      </Container>

      {/* MODAL INSERTAR CLIENTES ---------------------- */}
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Insertar Cliente</Modal.Title>
          </Modal.Header>

          <Modal.Body>
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
            value={cliente.telefono}></Form.Control>

            <Form.Label>@Email</Form.Label>
            <Form.Control
            name="email"
            onChange={handleChange}
            value={cliente.email}></Form.Control>

            <Form.Label>Dirección</Form.Label>
            <Form.Control
            name="direccion"
            onChange={handleChange}
            value={cliente.direccion}></Form.Control>
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
     <ToastContainer/>
    
    </>
  );
}

export default AdmCLientes;
