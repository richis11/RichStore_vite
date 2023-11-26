import React, { useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import { UserContext } from "../../context/UserContext";
import {
  Form,
  Button,
  Nav,
  Navbar,
  NavbarBrand,
  Dropdown,
  NavDropdown,
  InputGroup,
  ButtonGroup,
} from "react-bootstrap";
import reactLogo from "../../assets/react.svg";
//import viteLogo from "../../../public/vite.svg";
import { Link, NavLink } from "react-router-dom";

function ItemNavbar() {
  const { items } = useContext(CarritoContext);
  const { user } = useContext(UserContext);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <NavbarBrand as={NavLink} to="/">
          ⭐ RICH STORE ⭐
        </NavbarBrand>
        <Nav>
          {!user ||
            (!!user && (user.role === "admin" || user.role === "cliente") && (
              <Nav.Link as={NavLink} to="/novedades">
                Novedades
              </Nav.Link>
            ))}

          {!!user && user.role === "admin" && (
            <>
              <NavDropdown title="Gestion Personas">
                <NavDropdown.Item as={NavLink} to="/adm-users">
                  Adm. Usuarios
                </NavDropdown.Item>
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
            </>
          )}
          {!user ||
            (!!user && (user.role === "admin" || user.role === "cliente") && (
              <Nav.Link as={NavLink} to="/productos">
                Productos
              </Nav.Link>
            ))}

          {!!user && (user.role === "admin" || user.role === "almacen"|| user.role === 'cliente') && (
            <Nav.Link as={NavLink} to="/ventas">
              {user.role === 'cliente' ? 'Mis compras' :'Ventas'}
            </Nav.Link>
          )}

          {!!user && (user.role === "admin" || user.role === "envios" || user.role === "entregas"|| user.role === 'cliente') && (
            <Nav.Link as={NavLink} to="/envios">
              {user.role === 'cliente' ? 'Mis pedidos' :'Envios'}
            </Nav.Link>
          )}
        </Nav>

        <Navbar.Collapse className="justify-content-end ms-3">
          {/* <InputGroup>
          <Form.Control
            type="text"
            placeholder="Buscador proximamente... ⚠"
            aria-label="Input group example"
            aria-describedby="btnGroupAddon"
          />
          <Button variant='secondary'><i class="bi bi-search"></i></Button>
        </InputGroup> */}

          <Nav>
          {!user || (!!user && (user.role === 'admin' || user.role === 'cliente'))
          && <Nav.Link as={NavLink} to="/carrito">
              Carrito ({items})🛒
            </Nav.Link>}
            
            <NavDropdown title={user ? user.username : "user"}>
              {/* <NavDropdown.Item as={NavLink} to="">
               Ver perfil ...prox
             </NavDropdown.Item>  */}
              <NavDropdown.Item
                onClick={() => {
                  localStorage.removeItem("token");
                  console.log("token eliminado");
                  window.location.reload();
                }}
              >
                Cerrar sesion
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <div className="me-3 ms-3">
            <a href="https://vitejs.dev" target="_blank"></a>
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
