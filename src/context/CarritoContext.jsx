import React, { createContext, useState, useEffect } from "react";
import {toast, ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

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
          toast.success("Producto sumado",{autoClose:1500});
          return item_modif;
        }
        return product;
      });

      if (!productoEnCarrito) {
        nuevoCarrito.push(producto);
        toast.success("Producto agregado",{autoClose:1500});
      }

      SetCarrito(nuevoCarrito);
      SetItems(contar_items() + 1);
    } else {
      SetCarrito([...carrito, producto]);
      SetItems(carrito.length + 1);
      toast.success("Producto agregado",{autoClose:1500});
    }
  };

  const quitar_del_carrito = (producto) => {
    SetItems(contar_items()-producto.cantidad)
    SetCarrito(
      carrito.filter((product) => producto.id_producto !== product.id_producto)
    ); 
    console.log(carrito);
    toast.error(`${producto.nombre} se ha eliminado del Carrito.`,{autoClose:3000});
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
        toast.info("No se puede disminuir mas la cantidad, el minimo es 1", {autoClose:1500});
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
