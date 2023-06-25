import React, { useState, useEffect } from "react";
import venta_service from "../services/venta_service";
import venta_detalle_service from "../services/venta_detalle_service";
import { Container, Row, Col, Table, Button, Modal } from "react-bootstrap";

function Ventas() {
  const [ventas, SetVentas] = useState([]);
  const [venta_detalles, SetVenta_detalles] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getVentas();
  }, []);

  const getVentas = async () => {
    let lista_ventas = await venta_service.getVentas();
    SetVentas(lista_ventas.reverse());
  };

  const verDetalles = async (id_transaccion) => {
    console.log("ver_detalles");
    SetVenta_detalles(
      await venta_detalle_service.getVenta_detalle(id_transaccion)
    );
    console.log(venta_detalles);
    handleShow();
  };

  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col sm={9}>
            <h1>VENTAS 📋📈📊</h1>
          </Col>

          <Col style={{ textAlign: "right" }}>
            {/* <Button variant="success" onClick={handleShow}>
              Insertar <i className="bi bi-plus-circle"></i>
            </Button> */}
          </Col>
        </Row>
        <Row>
          <hr />
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>id_transaccion</th>
                <th>id_cliente</th>
                <th>Nombres</th>
                <th>Dirección</th>
                <th>Cant. Prods</th>
                <th>Subtotal</th>
                <th>Iva</th>
                <th>Descuento</th>
                <th>Total</th>
                <th>Tipo pago</th>
                <th>Detalles de compra</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map((venta) => (
                <tr key={venta.id}>
                  <td>{venta.id}</td>
                  <td>{venta.id_transaccion}</td>
                  <td>{venta.id_cliente}</td>
                  <td>{venta.nom_cliente}</td>
                  <td>{venta.dir_cliente}</td>
                  <td>{venta.cant_productos}</td>
                  <td>${venta.subtotal}</td>
                  <td>${venta.iva}</td>
                  <td>${venta.descuento}</td>
                  <td>${venta.total}</td>
                  <td>{venta.tipo_pago}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => verDetalles(venta.id_transaccion)}
                    >
                      ver detalles
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
      </Container>

      {/* ------------------------------------------------------------  MODAL DETALLES  */}
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Detalles de la venta 📋</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table>
            <thead>
              <tr>
                <th>id_transaccion</th>
                <th>id_producto</th>
                <th>Nombre</th>
                <th>Categoria</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {venta_detalles.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.id_transaccion}</td>
                  <td>{producto.id_producto}</td>
                  <td>{producto.nombre}</td>
                  <td>{producto.categoria}</td>
                  <td>{producto.descripcion}</td>
                  <td>${producto.precio}</td>
                  <td>{producto.cantidad}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Volver
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Ventas;
