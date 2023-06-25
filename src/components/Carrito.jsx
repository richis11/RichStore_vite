import React, { useContext, useEffect, useState } from "react";
import { Table, Button, ButtonGroup, InputGroup, Row, Col, Card, Modal, Form } from "react-bootstrap";
import { CarritoContext } from "../context/CarritoContext";
import cliente_service from "../services/cliente_service";
import venta_service from '../services/venta_service'
import venta_detalle_service from '../services/venta_detalle_service'
import productExample from "../images/productExample2.png";
import {v4 as uuidV4} from 'uuid'

function Carrito() {
  const { items, carrito, SetCarrito, quitar_del_carrito } = useContext(CarritoContext);
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
      subtotal += producto.precio;
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
      let uuidTransaccion = uuidV4()
      SetVenta({ ...venta, id_transaccion:uuidTransaccion, 
      id_cliente:cliente.id,  nom_cliente:cliente.nombres, dir_cliente:cliente.direccion, 
      tipo_pago:'PAGO DIRECTO💸'})

      const carrito_actualizado = carrito.map((producto)=>{
        console.log(producto.nombre)
        return{ ...producto, id_transaccion: uuidTransaccion }
      })
      SetCarrito(carrito_actualizado)
    
      console.log('UUID: '+uuidTransaccion)
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

    carrito.map((producto)=>{
      venta_detalle_service.crearVenta_detalle(producto)
      
    })

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
                  <th>Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {carrito.map((producto) => (
                  <tr key={producto.id_producto}>
                    <td>{producto.nombre}</td>
                    <td>{producto.categoria}</td>
                    <td>{producto.descripcion}</td>
                    <td>${producto.precio}</td>
                    <td>
                      <InputGroup aria-label="Basic example">
                        <ButtonGroup>
                          <Button variant="secondary">-</Button>
                          <InputGroup.Text>{producto.cantidad}</InputGroup.Text>
                          <Button variant="secondary">+</Button>
                        </ButtonGroup>
                      </InputGroup>
                    </td>

                    <td>
                      <Button
                        variant="outline-dark"
                        onClick={() => quitar_del_carrito(producto.id_producto)}
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
          <h5>Método de pago</h5>
          <Form.Select
            name="tipo_pago"
            onChange={(e) => SetVenta({ ...venta, tipo_pago: e.target.value })}
          >
            <option key={0} value={0}>
              Seleccionar método de pago
            </option>
            <option key={1} value={'🅿 PayPal'}>
             🅿 PayPal 
            </option>
            <option key={2} value={'💳 Tarjeta de crédito o débito '}>
            💳 Tarjeta de crédito o débito 
            </option>
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
