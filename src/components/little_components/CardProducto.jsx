import React, { useContext, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Card, Row, Col, InputGroup, ButtonGroup } from "react-bootstrap";
import productExample from "../../images/productExample2.png";
import { CarritoContext } from "../../context/CarritoContext";
import VistaProducto from "../VistaProducto";
import { Link, NavLink, useNavigate } from "react-router-dom";

function CardProducto({ producto }) {
  const {
    carrito,
    agregar_al_carrito,
    cantidad_item,
    quitar_del_carrito,
  } = useContext(CarritoContext);
  const [cart_product, Set_cart_product] = useState({
    // id: 0,
    // id_producto: 0,
    // id_transaccion: "",
    // nombre: "",
    // categoria: "",
    // descripcion: "",
    // precio: 0,
    // cantidad: 0,
  });

  const [cantItems, SetCantidadItems] = useState(0);
  const calcularCantItems = () => {
    if (carrito.length != 0) {
      carrito.map((productoCarrito) => {
        if (producto.id === productoCarrito.id_producto) {
          SetCantidadItems(productoCarrito.cantidad);
        }
      });
    }
  };

  const navigate = useNavigate();


  const operacion = (ope) => {
    if (carrito.length != 0) {
      if(ope!='quitar')
      {
        carrito.map((productoCarrito, indice) => {
          if (producto.id === productoCarrito.id_producto) {
            cantidad_item(indice, ope);
          }
        });
      }
      else{
        const product = {...cart_product, cantidad:cantItems}
        console.log(product)
        quitar_del_carrito(product)
        SetCantidadItems(0)
      }
      
    }
  };

  const agregar = () => {
    agregar_al_carrito(cart_product);
    SetCantidadItems();
  };

  useEffect(() => {
    calcularCantItems();

    const palabras = producto.descripcion.split(/\s+/); // Divide por espacios
    const nPalabras = palabras.length;
    let primerasPalabras = palabras.slice(0, 15).join(" "); // Toma las primeras n palabras y une con espacio

    if (nPalabras > 15) {
      primerasPalabras = primerasPalabras + "...";
    }

    
    Set_cart_product({
      id_producto: producto.id,
      id_transaccion: "XXXX-XXXX-XXXX",
      nombre: producto.nombre,
      categoria: producto.categoria,
      descripcion: primerasPalabras,
      precio: producto.precio_ven,
      cantidad: 1,
    });
  }, [carrito]);

  return (
    <Card 
      style={{ width: "18rem", margin: "10px" }}

    >
      <Card.Img
        variant="top"
        src={producto.imgUrl ? producto.imgUrl : productExample}
        alt="imagen producto"
        style={{ objectFit: "cover", height: "150px" }}
        onClick={() => navigate(`/producto?id=${encodeURIComponent(cart_product.id_producto)}`)}
      />

      <Card.Body className="d-flex flex-column">
        <Row>
          <Col sm={8}>
            <Card.Title >{cart_product.nombre}</Card.Title>
          </Col>
          <Col>
            <Card.Title style={{ textAlign: "right" }}>
              ${cart_product.precio}
            </Card.Title>
          </Col>
        </Row>
        <Card.Text>{cart_product.descripcion}</Card.Text>

        <div
          className="mt-auto"
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {/* <Button variant="outline-success">Comprar</Button> */}
          {cantItems == 0 ? (
            <Button
              variant="outline-dark"
              onClick={() => {
                agregar();
              }}
            >
              Añadir al carrito 🛒
            </Button>
          ) : (
            <>
              <Button
                variant="outline-dark"
                onClick={() => operacion('quitar')}
              >
                Quitar
              </Button>

              <InputGroup
                aria-label="Basic example"
                className="mt-auto"
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <ButtonGroup>
                  <Button variant="secondary" onClick={() => operacion("-")}>
                    -
                  </Button>
                  <InputGroup.Text>{cantItems}</InputGroup.Text>
                  <Button variant="secondary" onClick={() => operacion("+")}>
                    +
                  </Button>
                </ButtonGroup>
              </InputGroup>
            </>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default CardProducto;
