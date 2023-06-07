import React, { useContext, useEffect, useState } from "react";
import { Table, Button, Row, Col, Card, Modal, Form } from "react-bootstrap";
import { CarritoContext } from "../context/CarritoContext";
import cliente_service from "../services/cliente_service";
import venta_service from '../services/venta_service'
import productExample from "../images/productExample2.png";

function Carrito() {
  const { items, carrito, quitar_del_carrito } = useContext(CarritoContext);
  const [venta, SetVenta] = useState({ id_transaccion:'', 
  id_cliente:null,  nom_cliente:'', dir_cliente:'', 
  cant_productos:0, subtotal: 0, iva: 0, descuento:0, total: 0 , tipo_pago:''});
  const [clientes, SetClientes] = useState([]);
  const [cliente, SetCliente] = useState({
    cedula: "",
    nombres: "",
    telefono: "",
    email: "",
    direccion: "",
  });

  const vaciarCliente = () => {
    SetCliente({
      cedula: "",
      nombres: "",
      telefono: "",
      email: "",
      direccion: "",
    });
  };

 

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    calcularVenta();
    getClientes();
    crearVenta()
  }, [items, cliente]);

  const calcularVenta = () => {
    let subtotal = 0;
    let iva = 0;
    let total = 0;
    let descuento = 0;
    carrito.map((producto) => {
      subtotal += producto.precio_ven;
      iva = subtotal * 0.12;
      total = subtotal + iva;
    });
    SetVenta({ ...venta, cant_productos: items, subtotal: subtotal, iva: iva, descuento:descuento, total: total });
  };

  const getClientes = async () => {
    SetClientes(await cliente_service.getClientes());
  };
  const getCliente = async (id) => {
    SetCliente(await cliente_service.getCliente(id));
  };

  const un_producto = () => {
    if (items == 1) {
      return "producto";
    } else {
      return "productos";
    }
  };

  const seleccionarCliente = (id) => {
    if (id != 0) {  
      SetCliente(getCliente(id))

    } else {
      vaciarCliente();
    }
  };


  const crearVenta = () =>{
    if (cliente.nombres){
      SetVenta({ ...venta, id_transaccion:'XXX-XXX-XX1', 
      id_cliente:cliente.id,  nom_cliente:cliente.nombres, dir_cliente:cliente.direccion, 
      tipo_pago:'PAGO DIRECTO💸'})
    
      console.log('crearVenta dice: existe cliente')
    }    
    else
    {
      console.log('crearVenta dice: no existe cliente')
    }
  }
  
  const handlePagar = () => {
    if (cliente.nombres !== "") {
      console.log("PAGAR DICE: el cliente seleccionado es :");
      console.log(cliente);
      console.log(carrito)
      venta_service.crearVenta(venta)

    }
    else{
      alert('Debes seleccionar el cliente animal!')
    }
  };

  return (
    <>
      <div className="container mt-3">
        <h1 style={{ textAlign: "right" }}>Carrito🛒</h1>
        <hr />
        <Row>
          <Col>
            <Table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Categoria</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                {carrito.map((producto) => (
                  <tr key={producto.id}>
                    <td>{producto.nombre}</td>
                    <td>{producto.categoria}</td>
                    <td>{producto.descripcion}</td>
                    <td>${producto.precio_ven}</td>

                    <td>
                      <Button
                        variant="outline-dark"
                        onClick={() => quitar_del_carrito(producto.id)}
                      >
                        Quitar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <Col sm={3}>
            <Card className="p-3">
              <h3>Resumen de la compra</h3>
              <Row>
                <strong style={{ width: "50%" }}>Cant. Items: </strong>
                <span style={{ textAlign: "right", width: "50%" }}>
                  {items}
                </span>
              </Row>
              <hr />
              <Row>
                <strong style={{ width: "50%" }}>Subtotal: </strong>
                <span style={{ textAlign: "right", width: "50%" }}>
                  $ {venta.subtotal}
                </span>
              </Row>
              <hr />
              <Row>
                <strong style={{ width: "50%" }}>IVA 12%: </strong>
                <span style={{ textAlign: "right", width: "50%" }}>
                  $ {venta.iva.toFixed(2)}
                </span>
              </Row>
              <hr />
              <Row>
                <strong style={{ width: "50%" }}>Descuento: </strong>
                <span style={{ textAlign: "right", width: "50%" }}>
                  ...prox...✨
                </span>
              </Row>
              <hr />

              <Row>
                <strong style={{ width: "50%" }}>TOTAL: </strong>
                <span style={{ textAlign: "right", width: "50%" }}>
                  <strong>$ {venta.total}</strong>
                </span>
              </Row>
              <br />
              <Button
                variant="warning"
                onClick={() => {
                  if (items > 0) {
                    handleShow();
                  } else {
                    alert("El carrito esta vacio");
                  }
                }}
              >
                Proceder a pagar
              </Button>
            </Card>
          </Col>
        </Row>
      </div>

      {/* ------------------------------------------------------------  MODAL PAGAR  */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>PAGO DE PRODUCTOS 💳 RICH STORE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card.Img variant="top" src={productExample} alt="imagen producto" />
          <h5>
            Estas a punto de realizar una compra EN LA MEJOR TIENDA ONLINE 😎🤑
          </h5>
          <br />
          <h5>Identificate!</h5>
          <span>Selecciona el cliente que eres:</span>
          <Form.Select
            name="cliente"
            onChange={(e) => seleccionarCliente(e.target.value)}
          >
            <option key={0} value={0}>
              Seleccionar cliente...
            </option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nombres}
              </option>
            ))}
          </Form.Select>
          <br />
          <h5>
            Vas a realizar el pago de <strong>{items}</strong> {un_producto()}{" "}
            por un Total de <strong>${venta.total}</strong> dólares, ¿deseas
            continuar?
          </h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Volver
          </Button>
          <Button variant="success" onClick={handlePagar}>
            REALIZAR PAGO PORQUE SOY UN GOD💳💸😎
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Carrito;
