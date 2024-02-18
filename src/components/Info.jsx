import React from "react";
import reactLogo from "../assets/react.svg";
//import viteLogo from "../../public/vite.svg";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

//____________________________________________________________________________________
//_____________________________________________________________________________ CODEX

function Info() {


  //__________________________________________________________________________________
  //----------------------------------------------------------------------------- HTML
  //__________________________________________________________________________________
  return (
    <div style={{ textAlign: "center" }}>
      <br />
      <h1>😎 WELCOME TO THA RICH STORE 😎 </h1>
      <h3>💰💳🛒🚛🎮</h3>
      <h3>Here you will be able to sell wathever you want, and that's cool!</h3>
      <h5>but now, we're still building this app... please wait...</h5>
      <br /> 
      <Container className="">
        <div style={{ textAlign: "left" }}>
          <Row>
            <Col>
              <h6>SHOP REQUIREMENTS</h6>
              <ul>
                <li>
                  💥CRUD - productos✔, clientes✔, proveedores✔, empleados✔ - añadir buscar🤑
                </li>
                <li>
                  ⏳CARDS - Productos✔ - categorias✔- imagenes✔  - buscar🤑
                </li>
                <li>
                  ⏳CARRITO DE LA COMPRA✔ - cantidad items✔ - manejar stock🤑 - ventas✔ -  envios✔
                </li>
                <li>⏳FACTURAS - x email🔎 - generar PDF✔ - </li>
                <li>
                     ⏳LOGIN - Jwt TOKEN✔ - Usuarios✔ - Roles✔ - perfiles - Registro de Logs
                  - local storage✔
                </li>
                <li>🔷VALIDACIONES - </li>
                
                <li>🔷SISTEMA DE PAGOS - investigar Paypal y Tarjetas de crédito🔎 - CONTROL DE CONCURRENCIA</li>
                
                <li>⏳REPORTES - 10 mejores clientes✔ - 10 productos mas vendidos✔</li>
                <li>🔷NOTICIAS - PROMOCIONES - OFERTAS -</li>
                <li>🔷RECLAMOS</li>
                <li>🔷VISUAL - Notificaciones y alertas cheveres✔ - Tunearlo</li>
              </ul>
              <h6>INTELIGENCIA ARTIFICIAL </h6>
              <ul>
                <li>⏳CHATBOT💬</li>
                {/* <li>🔷🟢RECONOCIMIENTO DE IMAGENES</li> */}
              </ul>
              <h6>EN DESARROLLO...</h6>

              <NavLink as={NavLink} to="/pdf">
                <Button>PDF</Button>
              </NavLink>
            </Col>
            <Col sm={4}>
              <div className="">
                <a href="https://vitejs.dev" target="_blank">
                  {/* <img src={viteLogo} className="logo" alt="Vite logo" /> */}
                </a>
                <a target="_blank">
                  <img
                    src={reactLogo}
                    className="logoReactHome"
                    alt="React logo"
                  />
                </a>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
      <br />
      <h3>We will let you know when its done Bv</h3>
      <br />
      {/* <iframe src="https://forms.office.com/r/FLzFF0Jz6N?embed=true" style={{width:"640px", height:"480px",  frameborder:"0", marginwidth:"0", marginheight:"0", style:"border: none; max-width:100%; max-height:100vh"}} allowfullscreen webkitallowfullscreen mozallowfullscreen msallowfullscreen> </iframe> */}
      <footer
        style={{
          textAlign: "right",
          position: "relative",
          bottom: "0",
          background: "dimgray",
          color: "white",
          width: "100%",
          padding: "5pt",
        }}
      >
        Created on 28/03/2023 at 11:54:26 ©By RichardPesantez @richis11® ✔
      </footer>
    </div>
  );
}

export default Info;
