import React, { createContext, useState, useEffect } from "react";

export const CarritoContext = createContext();

export function CarritoContextProvider(props) {
  const [carrito, SetCarrito] = useState([]);
  const [items, SetItems] = useState(0);

  const agregar_al_carrito = (producto) => {
    console.log("agregar al carrito");

    if (carrito.length !== 0) {
      let productoEnCarrito = false;

      const nuevoCarrito = carrito.map((product) => {
        if (producto.id_producto === product.id_producto) {
          const item_modif = { ...product };
          item_modif.cantidad = item_modif.cantidad + 1;
          productoEnCarrito = true;
          console.log("producto sumado");
          return item_modif;
        }
        return product;
      });

      if (!productoEnCarrito) {
        nuevoCarrito.push(producto);
        console.log("producto agregado 2nd if");
      }

      SetCarrito(nuevoCarrito);
      SetItems(contar_items() + 1);
    } else {
      SetCarrito([...carrito, producto]);
      SetItems(carrito.length + 1);
      console.log("1er producto agregado");
    }
  };

  const quitar_del_carrito = (producto) => {
    SetItems(contar_items()-producto.cantidad)
    SetCarrito(
      carrito.filter((product) => producto.id_producto !== product.id_producto)
    ); 
    console.log(carrito);
  };

  const contar_items = () => {
    let total_items = 0;
    carrito.map((item) => (total_items += item.cantidad));
    SetItems(total_items);
    return total_items;
  };

  const cantidad_item = (indice, operacion) => {
    const item_modif = carrito[indice];
    if (operacion === "+") {
      item_modif.cantidad = item_modif.cantidad + 1;
      contar_items();
    }
    if (operacion === "-") {
      if (!(item_modif.cantidad <= 1)) {
        item_modif.cantidad = item_modif.cantidad - 1;
        contar_items();
      } else {
        alert("No se puede disminuir mas la cantidad, el minimo es 1");
      }
    }
    const carrito_actualizado = carrito.map((objeto, index) =>
      index === indice ? item_modif : objeto
    );
    SetCarrito(carrito_actualizado);
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        items,
        agregar_al_carrito,
        quitar_del_carrito,
        SetItems,
        SetCarrito,
        cantidad_item,
      }}
    >
      {props.children}
    </CarritoContext.Provider>
  );
}
