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
import proveedor_service from "../services/proveedor_service";

function AdmProveedores() {
  const [showModal, setShowModal] = useState(false);
  const [editar, SetEditar] = useState(false);
  const [proveedores, SetProveedores] = useState([]);
  const [proveedor, SetProveedor] = useState({
    ruc: "",
    nombres: "",
    telefono: "",
    email: "",
    direccion: "",
    estado: "",
  });

  useEffect(() => {
    getProveedores();
  }, []);

  const vaciarEstadoProveedor = () => {
    SetProveedor({
      ruc: "",
      nombres: "",
      telefono: "",
      email: "",
      direccion: "",
      estado: "",
    });
  };

  // llamar funciones de services
  const getProveedor = async (id) => {
    SetProveedor(await proveedor_service.getProveedor(id));
  };

  const getProveedores = async () => {
    let lista_proveedores=await proveedor_service.getProveedores()
    SetProveedores(lista_proveedores.reverse());
  };

  const crearProveedor = async (proveedor) => {
    await proveedor_service.crearProveedor(proveedor);
  };

  const editarProveedor = async (id, proveedor) => {
    await proveedor_service.editarProveedor(id, proveedor);
  };

  const eliminarProveedor = async (id) => {
    await proveedor_service.eliminarProveedor(id);
  };

  //handlers
  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    vaciarEstadoProveedor();
    SetEditar(false);
  };

  const handleChange = (e) => {
    SetProveedor({ ...proveedor, [e.target.name]: e.target.value });
  };

  const handleEditar = (id) => {
    getProveedor(id);
    SetEditar(true);
    handleShow();
  };

  const handleEliminar = async (id) => {
    await eliminarProveedor(id);
    getProveedores();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //validación de datos
    if (
      proveedor.ruc === "" ||
      proveedor.nombres === "" ||
      proveedor.telefono === "" ||
      proveedor.email === "" ||
      proveedor.direccion === "" ||
      proveedor.estado === ""
    ) {
      alert("Todos Los campos son obligatorios");
    } else {
      if (!editar) {
        //CREAR PRODUCTO
        await crearProveedor(proveedor);
        getProveedores();
      } else {
        // EDITAR PRODUCTO
        await editarProveedor(proveedor.id, proveedor);
        getProveedores();
      }
      //ocultar modal y vaciar proveedor
      handleClose();
    }
  };
//-------------------------------------------------------------------HTML
  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col sm={9}>
            <h1>Administrar Proveedores 🤵🏼🏬</h1>
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
                <th>Ruc</th>
                <th>Nombres</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th>Dirección</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {proveedores.map((proveedor) => (
                <tr key={proveedor.id}>
                  <td>{proveedor.id}</td>
                  <td>{proveedor.cedula}</td>
                  <td>{proveedor.nombres}</td>
                  <td>{proveedor.telefono}</td>
                  <td>{proveedor.email}</td>
                  <td>{proveedor.direccion}</td>
                  <td>{proveedor.estado}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => handleEditar(proveedor.id)}
                    >
                      <i className="bi bi-pencil"></i>
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleEliminar(proveedor.id)}
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

      {/* MODAL INSERTAR PROVEEDORES ---------------------- */}
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Insertar Proveedores</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Label>#Ruc</Form.Label>
            <Form.Control
              name="ruc"
              onChange={handleChange}
              value={proveedor.ruc}
            ></Form.Control>

            <Form.Label>Nombres de la persona o empresa</Form.Label>
            <Form.Control
              name="nombres"
              onChange={handleChange}
              value={proveedor.nombres}
            ></Form.Control>

            <Form.Label>#Teléfono</Form.Label>
            <Form.Control
              name="telefono"
              onChange={handleChange}
              value={proveedor.telefono}
            ></Form.Control>

            <Form.Label>@Email</Form.Label>
            <Form.Control
              name="email"
              onChange={handleChange}
              value={proveedor.email}
            ></Form.Control>

            <Form.Label>Dirección</Form.Label>
            <Form.Control
              name="direccion"
              onChange={handleChange}
              value={proveedor.direccion}
            ></Form.Control>

            <Form.Label>Estado</Form.Label>
            <Form.Control
              name="estado"
              onChange={handleChange}
              value={proveedor.estado}
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
    </>
  );
}

export default AdmProveedores;
