import React from "react";
import { useState, useEffect } from "react";
import producto_service from "../services/producto_service";
import CardProducto from "./little_components/CardProducto";
import { Row, Col} from "react-bootstrap";

function TarjetasProductos() {
  const [productos, SetProductos] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    SetProductos(await producto_service.getProductos());
  };

  return (
    <>
      <h1>Productos disponibles</h1>
      <div className="" style={{display:'flex',flexWrap:'wrap'}}>
        {productos.map((producto) => (
            <CardProducto key={producto.id} producto={producto} />
        ))}
      </div>
    </>
  );
}

export default TarjetasProductos;
