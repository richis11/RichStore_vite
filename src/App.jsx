import "./App.css";
import ItemNavbar from "./components/little_components/ItemNavbar";
import AdmCLientes from "./components/AdmCLientes";
import AdmEmpleados from "./components/AdmEmpleados";
import AdmProveedores from "./components/AdmProveedores";

import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AdmProductos from "./components/AdmProductos";
import TarjetasProductos from "./components/TarjetasProductos";
import Carrito from "./components/Carrito";
import Ventas from "./components/Ventas";
import PDFDocument from "./components/PDFDocument";
import Envios from "./components/Envios";

function App() {

  const pageNotFound = () => {
    return (
      <div  style={{textAlign:'center', margin:'20%'}}>
        <h1>⚠ 404 NOT FOUND ⚠</h1>
        <h2>😒 Where are you trying to go mdfk?🧐</h2>
      </div>
    );
  };

  return (
    <div className="App">
      <ItemNavbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/adm-clientes" element={<AdmCLientes />} />
        <Route path="/adm-empleados" element={<AdmEmpleados />} />
        <Route path="/adm-productos" element={<AdmProductos />} />
        <Route path="/adm-proveedores" element={<AdmProveedores />} />

        <Route path="/tarjetas" element={<TarjetasProductos/>} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="/envios" element={<Envios />} />

          {/* EN DESARROOLLO */}
          <Route path="/pdf" element={<PDFDocument />} />


        <Route path="*" element={pageNotFound()} />
      </Routes>
    </div>
  );
}

export default App;
