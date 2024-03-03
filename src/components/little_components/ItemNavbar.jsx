import React, { useContext, useState } from "react";
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
import { Link, NavLink, useNavigate } from "react-router-dom";
import producto_service from "../../services/producto_service";

function ItemNavbar({ onLoginClick, onLogoutClick }) {
  const { items } = useContext(CarritoContext);
  const { user } = useContext(UserContext);

  const [busqueda, SetBusqueda] = useState("");
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    // Verificar si la tecla presionada es Enter
    if (e.key === "Enter") {
      // Aquí colocas la lógica que quieres ejecutar cuando se presione Enter
      handleSubmit();
    }
  };
  const handleSubmit = async () => {
    navigate(`/productos?query=${encodeURIComponent(busqueda)}`);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" fixed="top" >
        <div>xx</div>
        <NavbarBrand as={NavLink} to="/">
           <h4>RICH STORE </h4>
        </NavbarBrand>
        <Nav>
          <Nav.Link as={NavLink} to="/novedades">
            Novedades
          </Nav.Link>

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

          <Nav.Link as={NavLink} to="/productos">
            Productos
          </Nav.Link>

          {!!user &&
            (user.role === "admin" ||
              user.role === "almacen" ||
              user.role === "cliente") && (
              <Nav.Link as={NavLink} to="/ventas">
                {user.role === "cliente" ? "Mis compras" : "Ventas"}
              </Nav.Link>
            )}

          {!!user &&
            (user.role === "admin" ||
              user.role === "envios" ||
              user.role === "entregas" ||
              user.role === "cliente") && (
              <Nav.Link as={NavLink} to="/envios">
                {user.role === "cliente" ? "Mis pedidos" : "Envios"}
              </Nav.Link>
            )}
          {!!user && (user.role === "admin" || user.role === "cliente") && (
            <Nav.Link as={NavLink} to="/analytics">
              {user.role === "admin" ? "Analytics" : "Reportes"}
            </Nav.Link>
          )}
        </Nav>

        <Navbar.Collapse className="justify-content-end ms-3 ">
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Buscar..."
              aria-label="Input group example"
              aria-describedby="btnGroupAddon"
              onChange={(e) => SetBusqueda(e.target.value)}
              value={busqueda}
              onKeyDown={handleKeyDown}
            />
            <Button variant="secondary">
              <i className="bi bi-search" onClick={handleSubmit}></i>
            </Button>
          </InputGroup>

          <Nav>
            <Nav.Link as={NavLink} to="/carrito">
              Carrito ({items})🛒
            </Nav.Link>

            {user.username ? (
              <NavDropdown title={user ? <h5>{user.username}</h5> : "user"}>
                {/* <NavDropdown.Item as={NavLink} to="">
               Ver perfil ...prox
             </NavDropdown.Item>  */}
                <NavDropdown.Item
                  // onClick={() => {
                  //   localStorage.removeItem("token");
                  //   console.log("token eliminado");
                  //   window.location.reload();
                  // }}
                  onClick={onLogoutClick}
                >
                  Cerrar sesion
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link onClick={onLoginClick}><h5>Acceder</h5></Nav.Link>
            )}
          </Nav>

          <div className="me-3 ms-3">
            <a></a>
            <Nav.Link as={NavLink} to="/info">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </Nav.Link>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default ItemNavbar;
