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
import empleado_service from "../services/empleado_service";
import {toast, ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

function AdmEmpleados() {
  const [showModal, setShowModal] = useState(false);
  const [editar, SetEditar] = useState(false);
  const [empleados, SetEmpleados] = useState([]);
  const [empleado, SetEmpleado] = useState({
    cedula: "",
    nombres: "",
    telefono: "",
    email: "",
    direccion: "",
    departamento: "",
    cargo: "",
    sueldo: 0,
    estado: "",
  });

  useEffect(() => {
    getEmpleados();
  }, []);

  const vaciarEstadoEmpleado = () => {
    SetEmpleado({
      cedula: "",
      nombres: "",
      telefono: "",
      email: "",
      direccion: "",
      departamento: "",
      cargo: "",
      sueldo: 0,
      estado: "",
    });
  };

  // llamar funciones de services
  const getEmpleado = async (id) => {
    SetEmpleado(await empleado_service.getEmpleado(id));
  };

  const getEmpleados = async () => {
    let lista_empleados=await empleado_service.getEmpleados()
    SetEmpleados(lista_empleados.reverse());
  };

  const crearEmpleado = async (empleado) => {
    await empleado_service.crearEmpleado(empleado);
  };

  const editarEmpleado = async (id, empleado) => {
    await empleado_service.editarEmpleado(id, empleado);
  };

  const eliminarEmpleado = async (id) => {
    await empleado_service.eliminarEmpleado(id);
  };

  //handlers
  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    vaciarEstadoEmpleado();
    SetEditar(false);
  };

  const handleChange = (e) => {
    SetEmpleado({ ...empleado, [e.target.name]: e.target.value });
  };

  const handleEditar = (id) => {
    getEmpleado(id);
    SetEditar(true);
    handleShow();
  };

  const handleEliminar = async (id) => {
    await eliminarEmpleado(id);
    getEmpleados();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //validación de datos
    if (
      empleado.ruc === "" ||
      empleado.nombres === "" ||
      empleado.telefono === "" ||
      empleado.email === "" ||
      empleado.direccion === "" ||
      empleado.estado === ""
    ) {
      toast.warn("Todos Los campos son obligatorios",{autoClose:1500});
    } else {
      if (!editar) {
        //CREAR PRODUCTO
        await crearEmpleado(empleado);
        getEmpleados();
      } else {
        // EDITAR PRODUCTO
        await editarEmpleado(empleado.id, empleado);
        getEmpleados();
      }
      //ocultar modal y vaciar empleado
      handleClose();
    }
  };
//------------------------------------------------------------- HTML
  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col sm={9}>
            <h1>Administrar Empleados 👩🏼‍💼👨🏼‍💼</h1>
          </Col>

          <Col style={{ textAlign: "right" }}>
            <Button variant="success" onClick={handleShow}>
              Insertar <i className="bi bi-plus-circle"></i>
            </Button>
          </Col>
        </Row>
        <Row>
          <hr />
          {empleados.length!==0 ? <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Cedula</th>
                <th>Nombres</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th>Dirección</th>
                <th>Departamento</th>
                <th>Cargo</th>
                <th>Sueldo</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {empleados.map((empleado) => (
                <tr key={empleado.id}>
                  <td>{empleado.id}</td>
                  <td>{empleado.cedula}</td>
                  <td>{empleado.nombres}</td>
                  <td>{empleado.telefono}</td>
                  <td>{empleado.email}</td>
                  <td>{empleado.direccion}</td>
                  <td>{empleado.departamento}</td>
                  <td>{empleado.cargo}</td>
                  <td>{empleado.sueldo}</td>
                  <td>{empleado.estado}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => handleEditar(empleado.id)}
                    >
                      <i className="bi bi-pencil"></i>
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleEliminar(empleado.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>:<h1>No hay empleados para mostrar.</h1>}
        </Row>
      </Container>

      {/* MODAL INSERTAR PROVEEDORES ---------------------- */}
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Insertar Empleados</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Label>#Cedula</Form.Label>
            <Form.Control
              name="cedula"
              onChange={handleChange}
              value={empleado.cedula}
            ></Form.Control>

            <Form.Label>Nombres</Form.Label>
            <Form.Control
              name="nombres"
              onChange={handleChange}
              value={empleado.nombres}
            ></Form.Control>

            <Form.Label>#Teléfono</Form.Label>
            <Form.Control
              name="telefono"
              onChange={handleChange}
              value={empleado.telefono}
            ></Form.Control>

            <Form.Label>@Email</Form.Label>
            <Form.Control
              name="email"
              onChange={handleChange}
              value={empleado.email}
            ></Form.Control>

            <Form.Label>Dirección</Form.Label>
            <Form.Control
              name="direccion"
              onChange={handleChange}
              value={empleado.direccion}
            ></Form.Control>

            <Form.Label>Departamento</Form.Label>
            <Form.Control
              name="departamento"
              onChange={handleChange}
              value={empleado.departamento}
            ></Form.Control>

            <Form.Label>Cargo</Form.Label>
            <Form.Control
              name="cargo"
              onChange={handleChange}
              value={empleado.cargo}
            ></Form.Control>

            <Form.Label>Sueldo</Form.Label>
            <Form.Control
              name="sueldo"
              onChange={handleChange}
              value={empleado.sueldo}
            ></Form.Control>

            <Form.Label>Estado</Form.Label>
            <Form.Control
              name="estado"
              onChange={handleChange}
              value={empleado.estado}
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
     <ToastContainer/>

    </>
  );
}

export default AdmEmpleados;
