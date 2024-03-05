import React, { createContext, useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../App.css'

import producto_service from '../services/producto_service'


export const CarritoContext = createContext();

export function CarritoContextProvider(props) {
  const [carrito, SetCarrito] = useState([]);
  const [items, SetItems] = useState(0);


const comprobar_stock = async (producto) => {
  try {
    let productoBD = await producto_service.getProducto(producto.id_producto);
    if ((producto.cantidad + 1) <= productoBD.stock) {
      //toast.info(`Si hay stock: (${producto.cantidad + 1} de ${productoBD.stock})`);
      return true;
    } else {
      //toast.warning(`No hay stock: (${producto.cantidad + 1} de ${productoBD.stock})`);
      return false;
    }
  } catch (error) {
    console.error("Error al comprobar stock:", error);
    //toast.error("Ocurrió un error al comprobar el stock");
    return false;
  }
};

const agregar_al_carrito = (producto) => {
  console.log("agregar al carrito");

  if (carrito.length !== 0) {
    let productoEnCarrito = false;

    const nuevoCarrito = carrito.map((product) => {
      if (producto.id_producto === product.id_producto) {
        return comprobar_stock(product)
          .then((hayStock) => {
            if (hayStock) {
              const item_modif = { ...product };
              item_modif.cantidad = item_modif.cantidad + 1;
              productoEnCarrito = true;
              toast.success("Producto sumado", { autoClose: 1500,className: "toast-custom-style" });
              return item_modif;
            } else {
              return product;
            }
          })
          .catch((error) => {
            console.error("Error al comprobar stock:", error);
            return product;
          });
      }
      return product;
    });

    Promise.all(nuevoCarrito)
      .then((productos) => {
        if (!productoEnCarrito) {
          productos.push(producto);
          toast.success("Producto agregado", { autoClose: 1500,className: "toast-custom-style" });
        }
        SetCarrito(productos);
        SetItems(contar_items() + 1);
      })
      .catch((error) => {
        console.error("Error al actualizar el carrito:", error);
      });
  } else {
    SetCarrito([...carrito, producto]);
    SetItems(carrito.length + 1);
    // toast.success("Producto agregado", { autoClose: 1500 });
    toast.success("Producto agregado", { 
      autoClose: 1500, 
      className: "toast-custom-style" // Clase CSS personalizada para estilizar la notificación
  });
  }
};
  

  const quitar_del_carrito = (producto) => {
    SetItems(contar_items() - producto.cantidad);
    SetCarrito(
      carrito.filter((product) => producto.id_producto !== product.id_producto)
    ); 
    console.log(carrito);
    toast.error(`${producto.nombre} se ha eliminado del Carrito.`, {
      autoClose: 3000, className: "toast-custom-style"
    });
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
        toast.info("No se puede disminuir mas la cantidad, el minimo es 1", {
          autoClose: 1500,className: "toast-custom-style"
        });
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
