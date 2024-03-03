// src/components/ChatComponent.js
import React, { useState } from "react";
import ChatBot from "react-simple-chatbot";
import { Button, Form } from "react-bootstrap";
import "./styles.css";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

import { ThemeProvider } from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";
import producto_service from "../services/producto_service";

// TEMA PAL CHATBOT
const theme = {
  background: "#f5f8fb",
  //fontFamily: 'Helvetica Neue',
  headerBgColor: "#323232",
  headerFontColor: "#fff",
  headerFontSize: "15px",
  botBubbleColor: "#323232",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a",
};

const ResponseComponent = ({ steps, triggerNextStep }) => {
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState("");
  const { user } = useContext(UserContext);
  const [producto, SetProducto] = useState({
    id: 0,
    id_producto: 0,
    id_transaccion: "",
    nombre: "",
    categoria: "",
    descripcion: "",
    precio: 0,
    cantidad: 0,
  });


  const { carrito, agregar_al_carrito } = useContext(CarritoContext);

  const agregar = async (id) => {
    let producto_result = await producto_service.getProducto(id);
    console.log(producto_result);

    const palabras = producto.descripcion.split(/\s+/); // Divide por espacios
    const nPalabras = palabras.length;
    let primerasPalabras = palabras.slice(0, 15).join(" "); // Toma las primeras n palabras y une con espacio

    if (nPalabras > 15) {
      primerasPalabras = primerasPalabras + "...";
    }

    const cart_product_ = {
      id_producto: producto_result.id,
      id_transaccion: "XXXX-XXXX-XXXX",
      nombre: producto_result.nombre,
      categoria: producto_result.categoria,
      descripcion: primerasPalabras,
      precio: producto_result.precio_ven,
      cantidad: 1,
    };

    console.log(cart_product_)
    agregar_al_carrito(cart_product_);
  };

  const fetchResponse = async () => {
    const userInput = steps.userInput.value;
    try {
      console.log(
        JSON.stringify({
          texto: userInput,
          user: user.username,
          userid: user.userid,
        })
      );

      const res = await fetch("http://localhost:5000/api/generate", {
        //  const res = await fetch('https://richard11.pythonanywhere.com/api/generate', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          texto: userInput,
          user: user.username,
          userid: user.userid,
        }),
      });
      const data = await res.json();

      setResponse(data.result);

      setLoading(false);
      triggerNextStep();
    } catch (error) {
      console.error(error);
      setResponse("Lo siento, hubo un error. Por favor, inténtalo de nuevo.");
      setLoading(false);
      triggerNextStep();
    }
  };

  React.useEffect(() => {
    fetchResponse();
  }, []);

  const getProduct = async (id) => {
    try {
      let product_result;
      if (id) {
        // Llamada a la función de búsqueda con el término 'query'
        product_result = await producto_service.getProducto(id);
      } else {
        // Llamada para obtener todos los productos si no hay término de búsqueda
        alert("NO HAY UN QUERY PARA EL PRODUCTO");
        return;
      }
      SetProducto(product_result);
      console.log(product_result);

      const palabras = product_result.descripcion.split(/\s+/); // Divide por espacios
      const nPalabras = product_result.length;
      let primerasPalabras = palabras.slice(0, 15).join(" "); // Toma las primeras n palabras y une con espacio

      if (nPalabras > 15) {
        primerasPalabras = primerasPalabras + "...";
      }

      Set_cart_product({
        id_producto: product_result.id,
        id_transaccion: "XXXX-XXXX-XXXX",
        nombre: product_result.nombre,
        categoria: product_result.categoria,
        descripcion: primerasPalabras,
        precio: product_result.precio_ven,
        cantidad: 1,
      });

      //   calcularCantItems(product_result.id);
    } catch (error) {
      if (error.response) {
        // El servidor respondió con un código de estado fuera del rango 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);

        // Mostrar mensaje de error
        toast.error(error.response.data.msg || "Error al buscar productos");
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        console.log(error.request);
        toast.error("No se pudo obtener una respuesta del servidor");
      } else {
        // Algo ocurrió al configurar la solicitud
        console.log("Error", error.message);
        toast.error("Error al realizar la solicitud");
      }
    }
  };

  const navigate = useNavigate();

  function linkify(inputText) {
    const regex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;
    return inputText.split(regex).map((part, index) => {
      // Esto verifica si la parte es una URL.
      if (part.match(regex)) {
        const parts = part.split("id=");
        const id = parts[1]; // Esto te dará '61' como string

        return (
          <>
            <Button
              variant="primary"
              key={index}
              as={NavLink}
              to={part}
              className="w-100 mb-2"
            >
              Ver el producto
            </Button>
            <Button
              variant="warning"
              key={index + 1}
              onClick={() => {
                agregar(id);
              }}
              className="w-100"
            >
              Añadir al carrito 🛒
            </Button>
          </>
        );
      } else {
        return part;
      }
    });
  }

  return (
    <div
      style={{ borderRadius: "10pt", background: "#323232", color: "white" }}
    >
      <div style={{ margin: "10pt" }}>
        {loading ? "Escribiendo..." : linkify(response)}
      </div>
    </div>
  );
};

const ChatComponent = () => {
  const [chatVisible, setChatVisible] = useState(false);
  const { user } = useContext(UserContext);
  const steps = [
    {
      id: "1",
      message: "¡Hola " + user.username + " ¿En qué puedo ayudarte hoy?",
      trigger: "userInput",
    },
    {
      id: "userInput",
      user: true,
      trigger: "getResponse",
    },
    {
      id: "getResponse",
      component: <ResponseComponent />,
      waitAction: true,
      trigger: "userInput",
    },
  ];

  return (
    <>
      <Button
        onClick={() => setChatVisible(!chatVisible)}
        className="chat-toggle-button2"
        variant="dark"
      >
        Chat <i className="bi bi-robot"></i>
      </Button>
      <div className={`chat-container ${chatVisible ? "" : "chat-hidden"}`}>
        <ThemeProvider theme={theme}>
          <ChatBot
            steps={steps}
            botDelay={200}
            userDelay={200}
            customDelay={200}
            headerTitle="RS ChatBot"
          />
        </ThemeProvider>
      </div>
    </>
  );
};

export default ChatComponent;
