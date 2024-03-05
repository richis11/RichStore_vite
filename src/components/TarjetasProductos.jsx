import React from "react";
import { useState, useEffect } from "react";
import producto_service from "../services/producto_service";
import CardProducto from "./little_components/CardProducto";
import { Row, Col, Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//____________________________________________________________________________________
//_____________________________________________________________________________ CODEX

function TarjetasProductos() {
  const [productos, SetProductos] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query");
    getProducts(query);
  }, [location]);

  const getProducts = async (query) => {
    try {
      let lista_productos;
      if (query) {
        // Llamada a la función de búsqueda con el término 'query'
        lista_productos = await producto_service.buscarProductos(query);
      } else {
        // Llamada para obtener todos los productos si no hay término de búsqueda
        lista_productos = await producto_service.getProductos();
      }
      SetProductos(lista_productos.reverse());
    }
    catch (error) {
      if (error.response) {
          // El servidor respondió con un código de estado fuera del rango 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);

          // Mostrar mensaje de error
          toast.error(error.response.data.msg || 'Error al buscar productos');
      } else if (error.request) {
          // La solicitud fue hecha pero no se recibió respuesta
          console.log(error.request);
          toast.error('No se pudo obtener una respuesta del servidor');
      } else {
          // Algo ocurrió al configurar la solicitud
          console.log('Error', error.message);
          toast.error('Error al realizar la solicitud');
      }
  }

  };



  //__________________________________________________________________________________
  //----------------------------------------------------------------------------- HTML
  //__________________________________________________________________________________

  return (
    <>
    
      <h1>Productos disponibles</h1>
      <hr />
      <>
        {productos.length !== 0 ? (
          <div className="" style={{ display: "flex", flexWrap: "wrap" }}>
            {productos.map((producto) => (
              <CardProducto key={producto.id} producto={producto} />
            ))}
          </div>
        ) : (
          <h1>No hay productos disponibles.</h1>
        )}
      </>

      <ToastContainer />
    </>
  );
}

export default TarjetasProductos;
