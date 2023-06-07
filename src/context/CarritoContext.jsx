import React, { createContext, useState, useEffect } from "react";

export const CarritoContext = createContext();

export function CarritoContextProvider(props) {
  const [carrito, SetCarrito] = useState([]);
  const [items, SetItems] = useState(0);

  const agregar_al_carrito = (producto) => {
    SetCarrito([...carrito, producto]);
    SetItems(carrito.length+1);
  };

  const quitar_del_carrito = (producto_id) => {
     SetCarrito(carrito.filter((producto) => producto_id !== producto.id));
     SetItems(carrito.length-1);
  };

 

  return (
    <CarritoContext.Provider
      value={{
        carrito, items,
        agregar_al_carrito,
        quitar_del_carrito,

      }}
    >
      {props.children}
    </CarritoContext.Provider>
  );
}
