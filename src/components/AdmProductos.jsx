import { React, useState, useEffect } from "react";
import {
  Table,
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
  InputGroup,
  ButtonGroup,
} from "react-bootstrap";
import producto_service from "../services/producto_service";
import categoria_service from "../services/categoria_service";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//____________________________________________________________________________________
//_____________________________________________________________________________ CODEX

function AdmProductos() {
  const [showModal, setShowModal] = useState(false);
  const [showModalCategorias, setShowModalCategorias] = useState(false);
  const [editar, SetEditar] = useState(false);
  const [editarCat, SetEditarCat] = useState(false);
  const [productos, SetProductos] = useState([]);
  const [categorias, SetCategorias] = useState([]);
  const [producto, SetProducto] = useState({
    nombre: "",
    categoria: "",
    descripcion: "",
    precio_ven: 0,
    precio_prov: 0,
    stock: 0,
  });
  const [categoria, SetCategoria] = useState({
    nombre: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
      setSelectedFile(e.target.files[0]);
  };
  
  const handleUpload = async (e) => {
      e.preventDefault();
      if (!selectedFile) {
          alert('Por favor, selecciona un archivo primero.');
          return;
      }
  
      // Aquí puedes implementar la lógica para subir el archivo a Cloudinary
      // Utiliza FormData para enviar el archivo
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('upload_preset', 'quetzacoatl');
  
      // Sube la imagen usando fetch o axios
      const response = await fetch('https://api.cloudinary.com/v1_1/dytjnd8mb/image/upload', {
          method: 'POST',
          body: formData
      });
  
      const data = await response.json();
      console.log(data);
      return data
  };
  






  useEffect(() => {
    getProducts();
    getCategorias();
  }, []);

  const vaciarEstadoProducto = () => {
    SetProducto({
      nombre: "",
      categoria: "",
      descripcion: "",
      precio_ven: 0,
      precio_prov: 0,
      stock: 0,
    });
  };

  // llamar funciones de services
  const getProducto = async (id) => {
    SetProducto(await producto_service.getProducto(id));
  };

  const getProducts = async () => {
    let lista_productos = await producto_service.getProductos();
    SetProductos(lista_productos.reverse());
  };

  const crearProducto = async (producto) => {
    await producto_service.crearProducto(producto);
  };

  const editarProducto = async (id, producto) => {
    await producto_service.editarProducto(id, producto);
  };

  const eliminarProducto = async (id) => {
    await producto_service.eliminarProducto(id);
  };

  // categoria services
  const getCategoria = async (id) => {
    SetCategoria(await categoria_service.getCategoria(id));
  };

  const getCategorias = async () => {
    let lista_categorias = await categoria_service.getCategorias();
    SetCategorias(lista_categorias.reverse());
  };

  const crearCategoria = async (categoria) => {
    await categoria_service.crearCategoria(categoria);
  };

  const editarCategoria = async (id, categoria) => {
    await categoria_service.editarCategoria(id, categoria);
  };

  const eliminarCategoria = async (id) => {
    await categoria_service.eliminarCategoria(id);
  };

  //handlers
  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    vaciarEstadoProducto();
    SetEditar(false);
  };
  const handleShowCategorias = () => setShowModalCategorias(true);
  const handleCloseCategorias = () => {
    setShowModalCategorias(false);
    SetEditarCat(false);
    SetCategoria({ ...categoria, nombre: "" });
  };
  const handleChangeCat = (e) => {
    SetCategoria({ ...categoria, [e.target.name]: e.target.value });
  };

  const handleChange = (e) => {
    SetProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleEditar = (id) => {
    getProducto(id);
    SetEditar(true);
    handleShow();
  };

  const handleEditarCat = (id) => {
    getCategoria(id);
    SetEditarCat(true);
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
        await eliminarProducto(id);
        getProducts();
        Swal.fire({
          title: "Eliminado!",
          text: "El producto ha sido eliminado con éxito!",
          icon: "success",
          timer: "2000",
          showConfirmButton: false,
        });
      }
    });
  };

  const handleEliminarCat = async (id) => {
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
        await eliminarCategoria(id);
        getCategorias();
        Swal.fire({
          title: "Eliminado!",
          text: "La categoria ha sido eliminada con éxito!",
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
      producto.nombre === "" ||
      producto.categoria === "" ||
      producto.descripcion === "" ||
      producto.precio_ven === 0 ||
      producto.precio_prov === 0 ||
      producto.stock === 0
    ) {
      toast.warn("Todos Los campos son obligatorios", { autoClose: 1500 });
    } else {
      if (!editar) {
        //CREAR PRODUCTO
        if (!selectedFile) {
          alert('Por favor, selecciona un archivo primero.');
          return;
        }
        const imgData = await handleUpload(e)
        console.log('IMRIMIENDO IMG-DATA...')
        //console.log(imgData)
        const imgUrl = imgData.url
        console.log(imgUrl)
        const newProduct = {...producto, imgUrl:imgUrl}

        await crearProducto(newProduct);
        getProducts();
        Swal.fire({
          title: "PRODUCTO AGREGADO",
          text: "El producto ha sido agregado con éxito!",
          icon: "success",
          showConfirmButton: false,
          timer: "2000",
        });
      } else {
        // EDITAR PRODUCTO
        await editarProducto(producto.id, producto);
        getProducts();
        Swal.fire({
          title: "PRODUCTO MODIFICADO",
          text: "El producto ha sido editado con éxito!",
          icon: "success",
          showConfirmButton: false,
          timer: "2000",
        });
      }
      //ocultar modal y vaciar producto
      handleClose();
    }
  };

  const vaciarCat = () => {
    SetEditarCat(false);
    SetCategoria({ ...categoria, nombre: "" });
   }

  const handleSubmitCat = async (e) => {
    e.preventDefault();

    //validación de datos
    if (categoria.nombre === "") {
      toast.warn("No hay nada para ingresar", { autoClose: 1500 });
    } else {
      if (!editarCat) {
        //CREAR PRODUCTO
        await crearCategoria(categoria);
        getCategorias();
        SetCategoria({ ...categoria, nombre: "" });
        Swal.fire({
          title: "CATEGORIA AGREGADA",
          text: "La categoria ha sido agregada con éxito!",
          icon: "success",
          showConfirmButton: false,
          timer: "2000",
        });
      } else {
        // EDITAR PRODUCTO
        toast.info(categoria);

        await editarCategoria(categoria.id, categoria);
        getCategorias();
        vaciarCat();
        Swal.fire({
          title: "CATEGORIA MODIFICADA",
          text: "La categoria ha sido editada con éxito!",
          icon: "success",
          showConfirmButton: false,
          timer: "2000",
        });
      }
      //ocultar modal y vaciar producto
    }
  };





  //__________________________________________________________________________________
  //----------------------------------------------------------------------------- HTML
  //__________________________________________________________________________________

  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col sm={7}>
            <h1>Administrar Productos 🎮📋</h1>
          </Col>

          <Col style={{ textAlign: "right" }}>
            <Button variant="outline-dark" onClick={handleShowCategorias}>
              Categorias <i className="bi bi-list"></i>
            </Button>
            <Button variant="success" onClick={handleShow}>
              Insertar producto <i className="bi bi-plus-circle"></i>
            </Button>
          </Col>
        </Row>
        <Row>
          {/* <InputGroup>
              <Form.Control type="file" onChange={handleFileChange} />
              <Button onClick={handleUpload} >Subir Imagen</Button>
          </InputGroup> */}
      
          <hr />
          {productos.length !== 0 ? (
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Categoria</th>
                  <th>Descripción</th>
                  <th>Precio Venta</th>
                  <th>Precio Proveedor</th>
                  <th>Stock</th>
                  <th>Opciones⚙</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <tr key={producto.id}>
                    <td>{producto.id}</td>
                    <td>{producto.nombre}</td>
                    <td>{producto.categoria}</td>
                    <td>{producto.descripcion}</td>
                    <td>${producto.precio_ven}</td>
                    <td>${producto.precio_prov}</td>
                    <td>{producto.stock}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => handleEditar(producto.id)}
                      >
                        <i className="bi bi-pencil"></i>
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleEliminar(producto.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <h1>No hay productos para mostrar.</h1>
          )}
        </Row>
      </Container>

      {/* MODAL INSERTAR PRODUCTO ------------------------------------------------- */}
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {!editar ? "Insertar" : "Modificar"} Producto
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              name="nombre"
              onChange={handleChange}
              value={producto.nombre}
            ></Form.Control>

            <Form.Label>Categoría</Form.Label>
            <Form.Select
              name="nombre"
              onChange={(e) =>
                SetProducto({ ...producto, categoria: e.target.value })
              }
            >
              <option key={0} value={0}>
                Seleccionar categoria...
              </option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.nombre}>
                  {categoria.nombre}
                </option>
              ))}
            </Form.Select>

            <Form.Label>Descripción</Form.Label>
            <Form.Control
              name="descripcion"
              onChange={handleChange}
              value={producto.descripcion}
            ></Form.Control>

            <Form.Label>Precio de Venta</Form.Label>
            <Form.Control
              name="precio_ven"
              onChange={handleChange}
              value={producto.precio_ven}
            ></Form.Control>

            <Form.Label>Precio del Proveedor</Form.Label>
            <Form.Control
              name="precio_prov"
              onChange={handleChange}
              value={producto.precio_prov}
            ></Form.Control>

            <Form.Label>Stock</Form.Label>
            <Form.Control
              name="stock"
              onChange={handleChange}
              value={producto.stock}
            ></Form.Control>
              <br/>
                <Form.Control type="file" onChange={handleFileChange} />
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      {/*  ---------------------------------------------------------MODAL CATEGORIAS */}
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal
          show={showModalCategorias}
          onHide={handleCloseCategorias}
          size="sm"
        >
          <Modal.Header closeButton>
            <Modal.Title>Categorías</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <InputGroup>
              <Form.Control
                name="nombre"
                onChange={handleChangeCat}
                value={categoria.nombre}
              ></Form.Control>
              <Button variant="success" onClick={handleSubmitCat}>
                {!editarCat ? (
                  <>
                    Insertar <i className="bi bi-plus-circle"></i>
                  </>
                ) : (
                  <>
                    Editar <i className="bi bi-pencil"></i>
                  </>
                )}
              </Button>
              {editarCat? (<Button variant="outline-secondary" size="sm" onClick={vaciarCat}><i className="bi bi-x-circle"></i></Button>):<></>}
            </InputGroup>

            <hr />

            <div style={{ maxHeight: "400px", overflow: "auto" }}>
            {categorias.length !== 0 ? (
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Categoria</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {categorias.map((categoria) => (
                    <tr key={categoria.id}>
                      <td>{categoria.id}</td>
                      <td>{categoria.nombre}</td>
                      <td>
                        <Button
                          variant="primary"
                          onClick={() => handleEditarCat(categoria.id)}
                        >
                          <i className="bi bi-pencil"></i>
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleEliminarCat(categoria.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <h4>No hay categorias para mostrar.</h4>
            )}
            </div>

            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseCategorias}>
              Salir
            </Button>
            {/* <Button variant="primary" type="submit" >
              Guardar
            </Button> */}
          </Modal.Footer>
        </Modal>
      </div>

      <ToastContainer />
    </>
  );
}

export default AdmProductos;
