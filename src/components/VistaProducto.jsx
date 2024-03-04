import { React, useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import producto_service from "../services/producto_service";
import { toast, ToastContainer } from "react-toastify";
import {
  Card,
  Row,
  Col,
  InputGroup,
  ButtonGroup,
  Container,
  Button,
  Modal,
} from "react-bootstrap";
import productExample from "../images/productExample2.png";
import { CarritoContext } from "../context/CarritoContext";
import { Link, NavLink, useNavigate } from "react-router-dom";

function VistaProducto() {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const navigate = useNavigate();
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
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get("id");

  const {
    carrito,
    agregar_al_carrito,
    cantidad_item,
    quitar_del_carrito,
  } = useContext(CarritoContext);

  const [cart_product, Set_cart_product] = useState({
    id: 0,
    id_producto: 0,
    id_transaccion: "",
    nombre: "",
    categoria: "",
    descripcion: "",
    precio: 0,
    cantidad: 0,
  });
  const [cantItems, SetCantidadItems] = useState(0);

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

  useEffect(() => {
    getProduct(id);
  }, [id]); // Solo depende de id para evitar llamadas innecesarias

  useEffect(() => {
    // Asegura que esta lógica se ejecute después de que `producto` se haya establecido
    if (producto.id) {
      calcularCantItems();
    }
  }, [producto, carrito]); // Depende de `producto` y `carrito` para recalcular cuando alguno cambie

  const calcularCantItems = () => {
    const itemEncontrado = carrito.find(
      (item) => item.id_producto === producto.id
    );
    if (itemEncontrado) {
      SetCantidadItems(itemEncontrado.cantidad);
    } else {
      SetCantidadItems(0); // Asegúrate de resetear a 0 si el producto no está en el carrito
    }
  };

  const agregar = () => {
    agregar_al_carrito(cart_product);
    SetCantidadItems();
  };

  const operacion = (ope) => {
    if (carrito.length != 0) {
      if (ope != "quitar") {
        carrito.map((productoCarrito, indice) => {
          if (producto.id === productoCarrito.id_producto) {
            cantidad_item(indice, ope);
          }
        });
      } else {
        const product = { ...cart_product, cantidad: cantItems };
        console.log(product);
        quitar_del_carrito(product);
        SetCantidadItems(0);
      }
    }
  };

  return (
    <>
      <Container style={{ marginTop: "8rem", marginBottom: "3rem" }}>
        <Card
          style={
            id == "0" || !producto.nombre
              ? { width: "50rem", height: "24rem" }
              : { width: "50rem" }
          }
        >
          <Card.Img
            variant="top"
            src={producto.imgUrl ? producto.imgUrl : productExample}
            alt="imagen producto"
            style={{ objectFit: "cover", height: "20rem" }}
            onClick={handleShowModal}
          />

          {/* <Card.ImgOverlay style={{ position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', display: 'flex', justifyContent: 'end', alignItems: 'center',marginBottom:'-12rem', color:'white'}}>
          {id == "0" || !producto.nombre ? <><h1 style={{ textAlign: 'center' }}>ESTE PRODUCTO NO EXISTE...</h1></> :<></>}
        </Card.ImgOverlay> */}
          {id == "0" || !producto.nombre ? (
            <div onClick={() => navigate(`/productos`)}>
              <h1>...Busca otros productos</h1>
            </div>
          ) : (
            <Card.Body className="d-flex flex-column">
              <Row>
                <Col sm={8}>
                  <Card.Title>{producto.nombre}</Card.Title>
                </Col>
                <Col>
                  <Card.Title style={{ textAlign: "right" }}>
                    ${producto.precio_ven}
                  </Card.Title>
                </Col>
              </Row>
              <Card.Text>{producto.descripcion}</Card.Text>

              <div
                className="mt-auto"
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                {/* <Button variant="outline-success">Comprar</Button> */}
                {cantItems == 0 ? (
                  <Button
                    variant="outline-dark"
                    onClick={() => {
                      agregar();
                    }}
                  >
                    Añadir al carrito 🛒
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outline-dark"
                      onClick={() => operacion("quitar")}
                    >
                      Quitar
                    </Button>

                    <InputGroup
                      aria-label="Basic example"
                      className="mt-auto"
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <ButtonGroup>
                        <Button
                          variant="secondary"
                          onClick={() => operacion("-")}
                        >
                          -
                        </Button>
                        <InputGroup.Text>{cantItems}</InputGroup.Text>
                        <Button
                          variant="secondary"
                          onClick={() => operacion("+")}
                        >
                          +
                        </Button>
                      </ButtonGroup>
                    </InputGroup>
                  </>
                )}
              </div>
            </Card.Body>
          )}
        </Card>
      </Container>

      {/* <Modal
        show={showModal}
        onHide={handleCloseModal}
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>{producto.nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={producto.imgUrl ? producto.imgUrl : productExample}
            alt="Imagen ampliada del producto"
            style={{ width: "100%", height: "auto" }} // La imagen es responsiva dentro del modal
          />
        </Modal.Body>
      </Modal> */}

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          
        }}

      >
        <Modal.Body style={{ display: "flex", padding: 0 }}>
          <img
            src={producto.imgUrl}
            alt="Imagen a tamaño completo"
            style={{ width: '100%', height: 'auto' }} 
            onClick={handleCloseModal}
          />
        </Modal.Body>
      </Modal>

      <ToastContainer />
    </>
  );
}

export default VistaProducto;
