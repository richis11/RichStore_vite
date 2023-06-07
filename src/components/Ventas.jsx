import React, { useState, useEffect } from 'react'
import venta_service from '../services/venta_service';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';

function Ventas() {
  const [ventas, SetVentas] = useState([]);

  useEffect (() =>{
    getVentas()
  },[])


  const getVentas = async () =>{
    SetVentas( await venta_service.getVentas())
  }

  const verDetalles = () => {
    alert('has clickao en ver detalles joder, ze ostille mutil!, tontua zara joder, don´t you see we´re still building it? eeee???? mdfk!')
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
                  <td>{venta.direccion}</td>
                  <td>{venta.cant_productos}</td>
                  <td>${venta.subtotal}</td>
                  <td>${venta.iva}</td>
                  <td>${venta.descuento}</td>
                  <td>${venta.total}</td>
                  <td>{venta.tipo_pago}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => verDetalles()}
                    >
                      ver detalles
                    </Button>
                    {/* <Button
                      variant="danger"
                      onClick={() => handleEliminar(producto.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </Button> */}
                  </td>
                </tr>
              ))}
              
            </tbody>
          </Table>
        </Row>
      </Container>
    </>
  )
}

export default Ventas