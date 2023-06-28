import React, { useState, useEffect } from "react";
import venta_service from "../services/venta_service";
import venta_detalle_service from "../services/venta_detalle_service";
import { Container, Row, Col, Table, Button, Modal } from "react-bootstrap";
import PDF_Factura from "./PDF_Factura";

function Ventas() {
  const [ventas, SetVentas] = useState([]);
  const [venta, SetVenta] = useState([]);
  const [venta_detalles, SetVenta_detalles] = useState([]);
  const [transaccion, Set_transaccion] = useState("XXXX-XXXX-XXXX");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  useEffect(() => {
    getVentas();
  }, []);

  const getVentas = async () => {
    let lista_ventas = await venta_service.getVentas();
    SetVentas(lista_ventas.reverse());
  };

  const verDetalles = async (venta) => {
    console.log("ver_detalles");
    SetVenta(venta);
    SetVenta_detalles(
      await venta_detalle_service.getVenta_detalle(venta.id_transaccion)
    );
    console.log(venta_detalles);
    handleShow();
  };

  const generar_factura_pdf = (ventas, venta_detalles) =>{

    handleShow1();
  }

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
                <th>Fecha</th>
                <th>id_cliente</th>
                <th>Nombres</th>
                <th>Dirección</th>
                {/* <th>Teléfono</th> */}
                {/* <th>Email</th> */}
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
                  <td>
                    {new Date(venta.fecha).toLocaleString("es-EC", {
                      timeZone: "America/Guayaquil",
                    })}
                  </td>
                  <td>{venta.id_cliente}</td>
                  <td>{venta.nom_cliente}</td>
                  <td>{venta.dir_cliente}</td>
                  {/* <td>{venta.telefono}</td>
                  <td>{venta.email}</td> */}
                  <td>{venta.cant_productos}</td>
                  <td>${venta.subtotal}</td>
                  <td>${venta.iva}</td>
                  <td>${venta.descuento}</td>
                  <td>${venta.total}</td>
                  <td>{venta.tipo_pago}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => verDetalles(venta)}
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
          <Modal.Title>
            Detalles de la venta 📋 {venta.id_transaccion}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <h4>CLIENTE: {venta.nom_cliente}</h4>
              <h4>DIRECCIÓN: {venta.dir_cliente}</h4>
            </Col>
            <Col sm={4}>
              <h4>Cant. items: {venta.cant_productos}</h4>
              <h4>TOTAL: ${venta.total}</h4>
              <Button variant="success" onClick={generar_factura_pdf}>Generar factura📃</Button>
            </Col>
          </Row>
          <hr />
          <Table>
            <thead>
              <tr>
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

      {/* ------------------------------------------------------------  MODAL FACTURA  */}
      <Modal show={show1} onHide={handleClose1} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            FACTURA 📋 {venta.id_transaccion}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <PDF_Factura venta={venta} venta_detalles={venta_detalles}/>
        </Modal.Body>
        <Modal.Footer>
        <Button>
            Enviar por correo @ ...prox...⚠
          </Button>
          <Button variant="secondary" onClick={handleClose1}>
            Volver
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Ventas;
