import React, { useContext, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Card, Row, Col } from "react-bootstrap";
import productExample from "../../images/productExample2.png";
import { CarritoContext } from "../../context/CarritoContext";

function CardProducto({ producto }) {
  const { agregar_al_carrito } = useContext(CarritoContext);
  const [cart_product, Set_cart_product] = useState({
    id: 0,
    id_producto: 0,
    id_transaccion: "",
    nombre: "",
    categoria: "",
    descripcion: "",
    precio: 0,
    cantidad: 0,
  });

  useEffect(() => {
    Set_cart_product({
      id_producto: producto.id,
      id_transaccion: "XXXX-XXXX-XXXX",
      nombre: producto.nombre,
      categoria: producto.categoria,
      descripcion: producto.descripcion,
      precio: producto.precio_ven,
      cantidad: 1,
    });
  }, []);

  return (
    <Card style={{ width: "18rem", margin: "10px" }}>
      <Card.Img variant="top" src={productExample} alt="imagen producto" />

      <Card.Body>
        <Row>
          <Col sm={8}>
            <Card.Title>{cart_product.nombre}</Card.Title>
          </Col>
          <Col>
            <Card.Title style={{ textAlign: "right" }}>
              ${cart_product.precio}
            </Card.Title>
          </Col>
        </Row>
        <Card.Text>{cart_product.descripcion}</Card.Text>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          {/* <Button variant="outline-success">Comprar</Button> */}
          <Button
            variant="outline-dark"
            onClick={() => {
              agregar_al_carrito(cart_product);
            }}
          >
            Añadir al carrito 🛒
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CardProducto;
