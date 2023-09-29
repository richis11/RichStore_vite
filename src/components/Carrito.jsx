import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  Button,
  ButtonGroup,
  InputGroup,
  Row,
  Col,
  Card,
  Modal,
  Form,
} from "react-bootstrap";
import Swal from 'sweetalert2'
import { CarritoContext } from "../context/CarritoContext";
import cliente_service from "../services/cliente_service";
import venta_service from "../services/venta_service";
import venta_detalle_service from "../services/venta_detalle_service";
import productExample from "../images/productExample2.png";
import { v4 as uuidV4 } from "uuid";
import envio_service from "../services/envio_service";

import {toast, ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

//____________________________________________________________________________________
//_____________________________________________________________________________ CODEX

function Carrito() {
  const { items, SetItems, carrito, SetCarrito, quitar_del_carrito, cantidad_item } =
    useContext(CarritoContext);
  const [venta, SetVenta] = useState({
    id_transaccion: "",
    fecha: null,
    id_cliente: null,
    cedula: "",
    nom_cliente: "",
    dir_cliente: "",
    telefono: "",
    email: "",
    cant_productos: 0,
    subtotal: 0,
    iva: 0,
    descuento: 0,
    total: 0,
    tipo_pago: "",
  });

  const [envio, SetEnvio] = useState({
    id_transaccion: "",
    id_cliente: null,
    cedula: "",
    nom_cliente: "",
    dir_cliente: "",
    telefono: "",
    cant_productos: 0,
    total: 0,
    fecha_facturación: null,
    fecha_envio: null,
    fecha_entrega: null,
    estado: "",
  });

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
  const vaciarCarrito = () => {
    SetCarrito([]);
    SetItems(0);
    vaciarCliente()
    handleClose()
  };

  const completar_compra =()=>{
    const nombres = cliente.nombres;
    const palabras = nombres.split(' '); // Dividir el string en palabras utilizando el espacio como separador
    const primeraPalabra = palabras[0]; // Obtener el primer elemento del arreglo de palabras

    Swal.fire({title:'🤑COMPRA EXITOSA🤑 ',html:`<p>La compra se realizó con éxito ${primeraPalabra}, en breves te llegará un correo con la factura de tu compra, ahora solo te queda esperar el envío, si en una semana no ha llegado comunícate con el centro de ayuda y soporte para un reembolso.<p/> <h4>Gracias por comprar en RichStore :D<h4/> <h3>Te queremos mucho ❤<h3/>`, icon:'success'})
    vaciarCarrito()
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    calcularVenta();
    getClientes();
    crearVenta();
  }, [items, cliente]);

  const calcularVenta = () => {
    let subtotal = 0;
    let iva = 0;
    let total = 0;
    let descuento = 0;
    carrito.map((producto) => {
      subtotal += (producto.precio*producto.cantidad);
      iva = subtotal * 0.12;
      total = subtotal + iva;
    });
    SetVenta({
      ...venta,
      cant_productos: items,
      subtotal: subtotal,
      iva: iva,
      descuento: descuento,
      total: total,
    });
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
      SetCliente(getCliente(id));
    } else {
      vaciarCliente();
    }
  };

  const crearVenta = () => {
    if (cliente.nombres) {
      let uuidTransaccion = uuidV4();
      SetVenta({
        ...venta,
        id_transaccion: uuidTransaccion,
        fecha: Date(),
        id_cliente: cliente.id,
        cedula: cliente.cedula,
        nom_cliente: cliente.nombres,
        dir_cliente: cliente.direccion,
        telefono: cliente.telefono,
        email: cliente.email,
        tipo_pago: "PAGO DIRECTO💸",
      });

      const carrito_actualizado = carrito.map((producto) => {
        console.log(producto.nombre);
        return { ...producto, id_transaccion: uuidTransaccion };
      });
      SetCarrito(carrito_actualizado);

      SetEnvio({
        ...envio,
        id_transaccion: uuidTransaccion,
        id_cliente: cliente.id,
        cedula: cliente.cedula,
        nom_cliente: cliente.nombres,
        dir_cliente: cliente.direccion,
        telefono: cliente.telefono,
        cant_productos: items,
        total: venta.total,
        fecha_facturacion: Date(),
        estado: "📃Facturado"
      })



      console.log("UUID: " + uuidTransaccion);
    } else {
      console.log("crearVenta dice: no existe cliente");
    }
  };

  const handlePagar = () => {
    if (cliente.nombres !== "") {
      console.log("PAGAR DICE: el cliente seleccionado es :");
      console.log(cliente);
      console.log(carrito);

      venta_service.crearVenta(venta);

      carrito.map((producto) => {
        venta_detalle_service.crearVenta_detalle(producto);
      });

      envio_service.crearEnvio(envio);

      completar_compra()

    } else {
      toast.info("Debes seleccionar el cliente!",{autoClose:1500});
    }
  };

  //__________________________________________________________________________________
  //----------------------------------------------------------------------------- HTML
  //__________________________________________________________________________________

  return (
    <>
      <div className="container mt-3">
        <Row>
          <Col>
          {items!=0 ? 
          <Button
          style={{ textAlign: "left" }}
          variant="outline-dark"
          onClick={vaciarCarrito}
        >
          Vaciar el carrito
        </Button>
        :''
         }
            
          </Col>
          <Col>
            <h1 style={{ textAlign: "right" }}>Carrito🛒</h1>
          </Col>
        </Row>
        <hr />
        {items ? <Row>
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
                {carrito.map((producto, indice) => (
                  <tr key={producto.id_producto}>
                    <td>{producto.nombre}</td>
                    <td>{producto.categoria}</td>
                    <td>{producto.descripcion}</td>
                    <td>${producto.precio}</td>
                    <td>
                      <InputGroup aria-label="Basic example">
                        <ButtonGroup>
                          <Button variant="secondary" onClick={()=>cantidad_item(indice,'-')}>-</Button>
                          <InputGroup.Text>{producto.cantidad}</InputGroup.Text>
                          <Button variant="secondary" onClick={()=>cantidad_item(indice,'+')}>+</Button>
                        </ButtonGroup>
                      </InputGroup>
                    </td>


                    <td>
                      <Button
                        variant="outline-dark"
                        onClick={() => quitar_del_carrito(producto)}
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
                  <strong>$ {venta.total.toFixed(2)}</strong>
                </span>
              </Row>
              <br />
              <Button
                variant="warning"
                onClick={() => {
                  if (items > 0) {
                    handleShow();
                  } else {
                    toast.info("El carrito esta vacio");
                  }
                }}
              >
                Proceder a pagar
              </Button>
            </Card>
          </Col>
        </Row>:<><h1>El carrito está vacio</h1> <h3>Agrega productos y aparecerán aqui :D</h3></>}
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
            <option key={1} value={"🅿 PayPal"}>
              🅿 PayPal
            </option>
            <option key={2} value={"💳 Tarjeta de crédito o débito "}>
              💳 Tarjeta de crédito o débito
            </option>
          </Form.Select>
          <br />
          <h5>
            Vas a realizar el pago de <strong>{items}</strong> {un_producto()}{" "}
            por un Total de <strong>${venta.total.toFixed(2)}</strong> dólares, ¿deseas
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

      <ToastContainer/>
    </>
  );
}

export default Carrito;
