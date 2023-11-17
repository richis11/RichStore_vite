import { React, useEffect, useState } from "react";
import {
  Table,
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import user_service from "../services/user_service";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidV4 } from "uuid";

//____________________________________________________________________________________
//_____________________________________________________________________________ CODEX

function Admusers() {
  const [showModal, setShowModal] = useState(false);
  const [editar, SetEditar] = useState(false);
  const [users, SetUsers] = useState([]);
  const [user, SetUser] = useState({
    userid: "",
    username: "",
    password: "",
    email: "",
    role: "",
    estado: "",
    created_at: "",
    updated_at: "",
  });

  useEffect(() => {
    getUsers();
  }, []);

  const vaciarEstadoUser = () => {
    SetUser({
      userid: "",
      username: "",
      password: "",
      email: "",
      role: "",
      estado: "",
      created_at: "",
      updated_at: "",
    });
  };

  // llamar funciones de services
  const getUser = async (id) => {
    SetUser(await user_service.getUser(id));
  };

  const getUsers = async () => {
    let lista_users = await user_service.getUsers();
    SetUsers(lista_users.reverse());
  };

  const crearUser = async (user) => {
    await user_service.crearUser(user);
  };

  const editarUser = async (id, user) => {
    await user_service.editarUser(id, user);
  };

  const eliminarUser = async (id) => {
    await user_service.eliminarUser(id);
  };

  //handlers
  const handleShow = (opc) => {
    if(opc){
      let useruuid = 'U-'+uuidV4();
      SetUser({ ...user, userid: useruuid })
    }
    
    setShowModal(true)}

  const handleClose = () => {
    setShowModal(false);
    vaciarEstadoUser();
    SetEditar(false);
  };

  const handleChange = (e) => {
    SetUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleEditar = (id) => {
    getUser(id);
    SetEditar(true);
    handleShow(false);
  };

  const handleEliminar = async (id) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await eliminarUser(id);
        getUsers();
        Swal.fire({
          title: "Eliminado!",
          text: "El user ha sido eliminado con éxito!",
          icon: "success",
          timer: "2000",
          showConfirmButton: false,
        });
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //validación de datos
    if (
      user.username === "" ||
      user.password === "" ||
      user.email === "" ||
      user.role === "" ||
      user.estado === ""
    ) {
      toast.warn("Todos Los campos son obligatorios", { autoClose: 1500 });
    } else {
      if (!editar) {
        //CREAR user
        await crearUser(user)
        
        getUsers();
        Swal.fire({ title: "user AGREGADO",
        text: "El  user ha sido agregado con éxito!", icon: "success" , showConfirmButton: false, timer:'2000' });
      } else {
        // EDITAR user
        await editarUser(user.id, user);
        getUsers();
        Swal.fire({ title: "user MODIFICADO", text: "El  user ha sido editado con éxito!", icon: "success" , showConfirmButton: false, timer:'2000' });
      }
      //ocultar modal y vaciar user
      handleClose();
    }
  };

  //__________________________________________________________________________________
  //----------------------------------------------------------------------------- HTML
  //__________________________________________________________________________________

  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col sm={9}>
            <h1>Administrar Usuarios 🧙🏼‍♂️</h1>
          </Col>

          <Col style={{ textAlign: "right" }}>
            <Button variant="success" onClick={()=>handleShow(true)}>
              Insertar <i className="bi bi-plus-circle"></i>
            </Button>
          </Col>
        </Row>
        <Row>
          <hr />
          {users.length !== 0 ? (
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>User_id</th>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Estado</th>
                  <th>Created_at</th>
                  <th>Updated_at</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.userid}</td>
                    <td>{user.username}</td>
                    <td>{user.password}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.estado}</td>

                    <td>
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleString(
                            "es-EC",
                            {
                              timeZone: "America/Guayaquil",
                            }
                          )
                        : "-"}
                    </td>

                    <td>
                      {user.updatedAt
                        ? new Date(user.updatedAt).toLocaleString(
                            "es-EC",
                            {
                              timeZone: "America/Guayaquil",
                            }
                          )
                        : "-"}
                    </td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => handleEditar(user.id)}
                      >
                        <i className="bi bi-pencil"></i>
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleEliminar(user.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <h1>No hay users para mostrar.</h1>
          )}
        </Row>
      </Container>

      {/* MODAL INSERTAR userS ------------------------------------------------- */}
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{!editar ? "Insertar" : "Modificar"} User</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              onChange={handleChange}
              value={user.username}
            ></Form.Control>

            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              onChange={handleChange}
              value={user.password}
            ></Form.Control>

            <Form.Label>@Email</Form.Label>
            <Form.Control
              name="email"
              onChange={handleChange}
              value={user.email}
            ></Form.Control>


            <Form.Label>Rol</Form.Label>
            <Form.Select
              name="role"
              onChange={(e) =>
                SetUser({ ...user, role: e.target.value })
              }
            >
              <option key={0} value={0}>
                {user.role ? user.role : 'Seleccionar rol...'}
              </option>
              
              <option key={1} value={'admin'}>
                admin
              </option>
              <option key={2} value={'almacen'}>
                almacen 
              </option>
              <option key={3} value={'envios'}>
                envios
              </option>
              <option key={4} value={'entregas'}>
                entregas
              </option>
              <option key={5} value={'cliente'}>
                cliente
              </option>
            </Form.Select>

            <Form.Label>Estado</Form.Label>
            <Form.Select
              name="estado"
              onChange={(e) =>
                SetUser({ ...user, estado: e.target.value })
              }
            >
              <option key={0} value={0}>
                {user.estado ? user.estado : 'Seleccionar estado...'}
              </option>
              
              <option key={1} value={'Activo'}>
              Activo
              </option>
              <option key={2} value={'Inactivo'}>
              Inactivo 
              </option>
              <option key={3} value={'Vacaciones'}>
              Vacaciones
              </option>
              <option key={4} value={'Baja medica'}>
              Baja_medica
              </option>
              <option key={5} value={'Baja por otro motivo'}>
              Baja por otro motivo
              </option>
            </Form.Select>

          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <ToastContainer />
    </>
  );
}

export default Admusers;
