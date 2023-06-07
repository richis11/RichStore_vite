import React,{useContext} from "react";
import Button from "react-bootstrap/Button";
import {Card, Row, Col} from "react-bootstrap";
import productExample from "../../images/productExample2.png";
import {CarritoContext} from "../../context/CarritoContext"


function CardProducto({ producto }) {
 const {agregar_al_carrito} = useContext( CarritoContext)



  return (
    <Card style={{ width: "18rem", margin:'10px' }}>
      <Card.Img variant="top" src={productExample} alt="imagen producto" />

      <Card.Body>
        <Row>
          <Col sm={8}>
            <Card.Title>{producto.nombre}</Card.Title>
          </Col>
          <Col>
            <Card.Title style={{textAlign:'right'}}>${producto.precio_ven}</Card.Title>
          </Col>
        </Row>
        <Card.Text>{producto.descripcion}</Card.Text>

        
          <div style={{display:'flex', justifyContent:'flex-end', alignItems:'flex-end'}}>
            {/* <Button variant="outline-success">Comprar</Button> */}
            <Button variant="outline-dark" onClick={()=>{agregar_al_carrito(producto)}}
            
            >Añadir al carrito 🛒</Button>
          </div>
        
      </Card.Body>
    </Card>
  );
}

export default CardProducto;
