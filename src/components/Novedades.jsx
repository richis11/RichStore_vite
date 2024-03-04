import React, { useEffect } from "react";
import { Container, Carousel } from "react-bootstrap";
import { useState } from "react";
//import ExampleCarouselImage from '../images/productExample2.png';
import CarouselImage from './CarouselImage'
import producto_service from "../services/producto_service";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Novedades() {
  const [index, setIndex] = useState(0);
  const [productos, SetProductos] = useState([])

  const navigate = useNavigate();

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const getNewProducts = async () => {
    try {
      const productosOriginales = await producto_service.getNewProducts();
      const productosModificados = productosOriginales.map((producto) => {
        // Si la descripción es más larga de 150 caracteres, recórtala
        if (producto.descripcion && producto.descripcion.length > 150) {
          return {
            ...producto,
            descripcion: producto.descripcion.substring(0, 200) + '...'
          };
        }
        return producto;
      });
  
      SetProductos(productosModificados);
    } catch (error) {
      console.error("Error al obtener los productos: ", error);
      // Manejar el error, por ejemplo, mostrando un mensaje al usuario
    }
  };
  
  useEffect(() =>{
    getNewProducts()
  },[])

  return (
    <>
      <Container className="mt-3">
        <div>
          <h1>Nuevos productos</h1>
          <hr />
          <div  >
            <Carousel activeIndex={index} onSelect={handleSelect} >
            {productos.map((producto) =>(
              <Carousel.Item key={producto.id}  onClick={() => navigate(`/producto?id=${encodeURIComponent(producto.id)}`)} >
                <CarouselImage text="First slide" imgUrl={producto.imgUrl}  />
                <Carousel.Caption style={{ color: 'white', backgroundColor: 'black', padding: '10px', borderRadius:'10pt' }}>
                  <h3>{producto.nombre}</h3>
                  <p>
                    {producto.descripcion}
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
            </Carousel>
            <hr />
          </div>
        </div>
      </Container>
    </>
  );
}

export default Novedades;
