import React from "react";
import reactLogo from "../assets/react.svg";
//import viteLogo from "../../public/vite.svg";
import { Container, Row, Col } from "react-bootstrap";

function Home() {
  return (
    <div style={{ textAlign: "center" }}>
      <br />
      <h1>😎 WELCOME TO THA RICH STORE 😎 </h1>
      <h3>Here you will be able to sell wathever you want, and that's cool!</h3>
      <h5>but now, we're still building this app... please wait...</h5>
      <br /> <br />
      <Container className="">
        <div style={{ textAlign: "left" }}>
          <Row>
            <Col>
              <h6>REQUIREMENTS</h6>
              <ul>
                <li>
                  💥CRUD - productos, clientes, proveedores, empleados - lo
                  basico - ✅ - añadir buscar -
                </li>
                <li>⏳CARDS - Productos - imagenes🔎 - categorias - buscar -</li>
                <li>⏳CARRITO DE LA COMPRA - ventas (poner fecha) - envios - </li>
                <li>🔷VALIDACIONES-</li>
                <li>🔷LOGIN - Jwt TOKEN🔎 - Usuarios - perfiles - investigar cookie de sesion-</li>
                <li>🔷FACTURAS - x email🔎 - generar PDF🔎 -</li>
                <li>🔷REPORTES - ... ya se verá de qué - </li>
                <li>🔷NOTICIAS - </li>
                <li>🔷PROMOCIONES - OFERTAS -</li>
                <li>🔷...</li>
                <li>🔷...</li>
                <li>🔷...</li>
              </ul>
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
      <footer style={{textAlign:'right', position:'absolute', bottom:'0', background:'dimgray', color:'white', width:'100%', padding:'5pt'}}>Created on 28/03/2023 at 11:54:26 ©By RichardPesantez @richis11® ✔</footer>
    </div>
  );
}

export default Home;
