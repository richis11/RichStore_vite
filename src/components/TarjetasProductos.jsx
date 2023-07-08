import React from "react";
import { useState, useEffect } from "react";
import producto_service from "../services/producto_service";
import CardProducto from "./little_components/CardProducto";
import { Row, Col} from "react-bootstrap";

import {toast, ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

//____________________________________________________________________________________
//_____________________________________________________________________________ CODEX

function TarjetasProductos() {
  const [productos, SetProductos] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let lista_productos=await producto_service.getProductos();
    SetProductos(lista_productos.reverse());
  };

  //__________________________________________________________________________________
  //----------------------------------------------------------------------------- HTML
  //__________________________________________________________________________________

  return (
    <>
      <h1>Productos disponibles</h1>
      <hr />
      {productos.length!==0? <div className="" style={{display:'flex',flexWrap:'wrap'}}>
        {productos.map((producto) => (
            <CardProducto key={producto.id} producto={producto} />
        ))}
      </div>:<h1>No hay productos disponibles.</h1>}

      <ToastContainer/>
    </>
  );
}

export default TarjetasProductos;
