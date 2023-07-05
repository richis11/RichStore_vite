import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import envio_service from "../services/envio_service";

function Envios() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (envio) => {
    setShow(true);
    SetEnvio(envio);
  };

  const [observacion, setObservacion] = useState("");
  const handleChange = (e) => {
    setObservacion(e.target.value);
  };

  const [envios, SetEnvios] = useState([]);
  const [envio, SetEnvio] = useState([]);

  const getEnvios = async () => {
    let lista_envios = await envio_service.getEnvios();
    SetEnvios(lista_envios.reverse());
  };

  useEffect(() => {
    getEnvios();
  }, []);

  const enviar_pedido = async (envio) => {
    let envio_actualizado = envio;
    envio_actualizado = {
      ...envio_actualizado,
      fecha_envio: Date(),
      estado: "🚛Enviado",
    };
    await envio_service.editarEnvio(envio.id, envio_actualizado);
    getEnvios();
  };

  const entregar_pedido = async (envio) => {
    let envio_actualizado = envio;
    envio_actualizado = {
      ...envio_actualizado,
      fecha_entrega: Date(),
      estado: "✔Entregado",
    };
    await envio_service.editarEnvio(envio.id, envio_actualizado);
    getEnvios();
  };

  const devolver_pedido = async (envio) => {
    if (observacion != "" && observacion.trim().length !== 0) {
      let envio_actualizado = envio;
      envio_actualizado = {
        ...envio_actualizado,
        estado: "❌No Entregado",
        observaciones: observacion,
      };
      await envio_service.editarEnvio(envio.id, envio_actualizado);
      getEnvios();
      SetEnvio([]);
      setObservacion("");
      handleClose();
    } else {
      alert("Debes escribir un motivo para los paquetes no entregados");
    }
  };

  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col sm={9}>
            <h1>ENVIOS 📋📦🚛</h1>
          </Col>

          <Col style={{ textAlign: "right" }}>
            {/* <Button variant="success" onClick={handleShow}>
              Insertar <i className="bi bi-plus-circle"></i>
            </Button> */}
          </Col>
        </Row>
        <Row>
          <hr />
          {envios.length!==0? <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>id_transaccion</th>
                <th>Cliente</th>
                <th>Dirección</th>
                <th>Cant. Prods</th>
                <th>Total</th>
                <th>Fecha de facturación</th>
                <th>Fecha de Envío</th>
                <th>Fecha de Entrega</th>
                <th>Estado</th>
                <th>Opciones</th>
                <th>Observaciones</th>
              </tr>
            </thead>
            <tbody>
              {envios.map((envio) => (
                <tr key={envio.id}>
                  <td>{envio.id}</td>
                  <td>{envio.id_transaccion}</td>
                  <td>{envio.nom_cliente}</td>
                  <td>{envio.dir_cliente}</td>
                  <td>{envio.cant_productos}</td>
                  <td>${envio.total}</td>
                  <td>
                    {envio.fecha_facturacion
                      ? new Date(envio.fecha_facturacion).toLocaleString(
                          "es-EC",
                          {
                            timeZone: "America/Guayaquil",
                          }
                        )
                      : "-"}
                  </td>
                  <td>
                    {envio.fecha_envio
                      ? new Date(envio.fecha_envio).toLocaleString("es-EC", {
                          timeZone: "America/Guayaquil",
                        })
                      : "-"}
                  </td>
                  <td>
                    {envio.fecha_entrega
                      ? new Date(envio.fecha_entrega).toLocaleString("es-EC", {
                          timeZone: "America/Guayaquil",
                        })
                      : "-"}
                  </td>
                  <td>{envio.estado}</td>

                  <td>
                    {envio.fecha_envio ? (
                      envio.estado !== "❌No Entregado" &&
                      envio.estado !== "✔Entregado" ? (
                        <>
                          <Button
                            variant="outline-success"
                            onClick={() => entregar_pedido(envio)}
                          >
                            Entregar
                          </Button>
                          <Button
                            variant="outline-danger"
                            onClick={() => handleShow(envio)}
                          >
                            Devolver
                          </Button>
                        </>
                      ) : (
                        "No disponible"
                      )
                    ) : (
                      <Button
                        variant="primary"
                        onClick={() => enviar_pedido(envio)}
                      >
                        Enviar pedido<i class="bi bi-send"></i>
                      </Button>
                    )}
                  </td>
                  <td>{envio.observaciones}</td>
                </tr>
              ))}
            </tbody>
          </Table>:<h1>No hay envios para mostrar.</h1>}
        </Row>
      </Container>

      {/* --------------------------------------- MODAL MOTIVO DEVOLUCION PEDIDO */}
      <Modal
        show={show}
        onHide={handleClose}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Motivo de devolución 📦❌
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Escribir motivo u observación</h4>
          <Form.Control type="text" onChange={handleChange} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Volver
          </Button>
          <Button onClick={() => devolver_pedido(envio)}>Guardar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Envios;
