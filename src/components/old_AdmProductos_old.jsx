import { React, useState, useEffect } from "react";
import {
  Table,
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
} from "react-bootstrap";

function AdmProductos_old() {
  const [showModal, setShowModal] = useState(false);
  const [editar, SetEditar] = useState(false);
  const [productos, SetProductos] = useState([]);
  const [producto, SetProducto] = useState({
    nombre: "",
    categoria: "",
    descripcion: "",
    precio_ven: 0,
    precio_prov: 0,
    stock: 0,
  });

  const vaciarEstadoProducto = () => {
    SetProducto({
      nombre: "",
      categoria: "",
      descripcion: "",
      precio_ven: 0,
      precio_prov: 0,
      stock: 0,
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  const getProducto = (id) => {
    fetch("http://localhost:3000/api/productos/" + id)
      .then((res) => res.json())
      .then((res) => SetProducto(res));
  };

  const getProducts = () => {
    fetch("http://localhost:3000/api/productos/")
      .then((res) => res.json())
      .then((res) => SetProductos(res));
  };

  const editarProducto = (id) => {
    //consulta
    const requestInit = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producto),
    };
    fetch("http://localhost:3000/api/productos/" + id, requestInit)
      .then((res) => res.text())
      .then((res) => getProducts());
  };

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    vaciarEstadoProducto();
    SetEditar(false);
  };

  const handleChange = (e) => {
    SetProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //validación de datos
    if (
      producto.nombre === "" ||
      producto.categoria === "" ||
      producto.descripcion === "" ||
      producto.precio_ven === 0 ||
      producto.precio_prov === 0 ||
      producto.stock === 0
    ) {
      alert("Todos Los campos son obligatorios");
    } else {
      if (!editar) {
        //consulta
        const requestInit = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(producto),
        };
        fetch("http://localhost:3000/api/productos/", requestInit)
          .then((res) => res.json())
          .then((res) => getProducts());
      } else {
        //CODIGO EDITAR
        editarProducto(producto.id);
      }

      //ocultar modal y vaciar producto
      handleClose();
    }
  };

  const handleEditar = (id) => {
    getProducto(id);
    SetEditar(true);
    handleShow();
  };

  const handleEliminar = (id) => {
    //consulta
    const requestInit = {
      method: "DELETE",
    };
    fetch("http://localhost:3000/api/productos/" + id, requestInit)
      .then((res) => res.text())
      .then((res) => getProducts());
  };




  //------------------------------------------------------------HTML
  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col sm={6}>
            <h1>Administrar Productos OLD - con fetch sin services🎮📋</h1>
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
                <th>Nombre</th>
                <th>Categoria</th>
                <th>Descripción</th>
                <th>Precio Venta</th>
                <th>Precio Proveedor</th>
                <th>Stock</th>
                <th>Opciones⚙</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.id}</td>
                  <td>{producto.nombre}</td>
                  <td>{producto.categoria}</td>
                  <td>{producto.descripcion}</td>
                  <td>${producto.precio_ven}</td>
                  <td>${producto.precio_prov}</td>
                  <td>{producto.stock}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => handleEditar(producto.id)}
                    >
                      <i className="bi bi-pencil"></i>
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleEliminar(producto.id)}
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

      {/* MODAL INSERTAR PRODUCTO ---------------------- */}
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Insertar Productos</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              name="nombre"
              onChange={handleChange}
              value={producto.nombre}
            ></Form.Control>

            <Form.Label>Categoría</Form.Label>
            <Form.Control
              name="categoria"
              onChange={handleChange}
              value={producto.categoria}
            ></Form.Control>

            <Form.Label>Descripción</Form.Label>
            <Form.Control
              name="descripcion"
              onChange={handleChange}
              value={producto.descripcion}
            ></Form.Control>

            <Form.Label>Precio de Venta</Form.Label>
            <Form.Control
              name="precio_ven"
              onChange={handleChange}
              value={producto.precio_ven}
            ></Form.Control>

            <Form.Label>Precio del Proveedor</Form.Label>
            <Form.Control
              name="precio_prov"
              onChange={handleChange}
              value={producto.precio_prov}
            ></Form.Control>

            <Form.Label>Stock</Form.Label>
            <Form.Control
              name="stock"
              onChange={handleChange}
              value={producto.stock}
            ></Form.Control>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default AdmProductos_old;