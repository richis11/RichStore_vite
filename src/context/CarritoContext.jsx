import React, { createContext, useState, useEffect } from "react";

export const CarritoContext = createContext();

export function CarritoContextProvider(props) {
  const [carrito, SetCarrito] = useState([]);
  const [items, SetItems] = useState(0);

  const agregar_al_carrito = (producto) => {
    SetCarrito([...carrito, producto]);
    SetItems(carrito.length+1);
  };

  const quitar_del_carrito = (id_producto) => {
     SetCarrito(carrito.filter((producto) => id_producto !== producto.id_producto));
     SetItems(carrito.length-1);
     console.log(carrito)
  };

 

  return (
    <CarritoContext.Provider
      value={{
        carrito, items,
        agregar_al_carrito,
        quitar_del_carrito,
        SetItems,
        SetCarrito

      }}
    >
      {props.children}
    </CarritoContext.Provider>
  );
}
