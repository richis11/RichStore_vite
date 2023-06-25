import React,{useContext} from "react";
import { CarritoContext } from "../../context/CarritoContext";
import {
  Form,
  Button,
  Nav,
  Navbar,
  NavbarBrand,
  Dropdown,
  NavDropdown, InputGroup, ButtonGroup
} from "react-bootstrap";
import reactLogo from "../../assets/react.svg";
//import viteLogo from "../../../public/vite.svg";
import { Link, NavLink } from "react-router-dom";

function ItemNavbar() {
const {items} = useContext(CarritoContext)

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <NavbarBrand as={NavLink} to="/home">⭐ RICH STORE ⭐</NavbarBrand>
        <Nav>
          <NavDropdown title="Gestion Personas">
            <NavDropdown.Item as={NavLink} to="/adm-clientes">
              Adm. Clientes
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/adm-empleados">
              Adm. Empleados
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/adm-proveedores">
              Adm. Proveedores
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Inventario">
            <NavDropdown.Item as={NavLink} to="/adm-productos">
              Adm. Productos
            </NavDropdown.Item>
            
          </NavDropdown>
          <Nav.Link as={NavLink} to="/tarjetas">Tarjetas Productos⏳</Nav.Link>
          <Nav.Link as={NavLink} to="/ventas">Ventas⏳</Nav.Link>
          <Nav.Link as={NavLink} to="/envios">Envios⚠</Nav.Link>
          <Nav.Link as={NavLink} to="/carrito">Carrito ({items})🛒⏳</Nav.Link>
        </Nav>
        
        <Navbar.Collapse className="justify-content-end ms-3">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Buscador proximamente... ⚠"
            aria-label="Input group example"
            aria-describedby="btnGroupAddon"
          />
          <Button variant='secondary'><i class="bi bi-search"></i></Button>
        </InputGroup>

        <div className="me-3 ms-3">
          <a href="https://vitejs.dev" target="_blank">
            {/* <img src={viteLogo} className="logo" alt="Vite logo" /> */}
          </a>
          <a href="https://reactjs.org" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        </Navbar.Collapse>
      </Navbar>
      
    </>
  );
}

export default ItemNavbar;
