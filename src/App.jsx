import "./App.css";
import ItemNavbar from "./components/little_components/ItemNavbar";
import AdmCLientes from "./components/AdmCLientes";
import AdmEmpleados from "./components/AdmEmpleados";
import AdmProveedores from "./components/AdmProveedores";
import AdmUsers from "./components/AdmUsers";

import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AdmProductos from "./components/AdmProductos";
import TarjetasProductos from "./components/TarjetasProductos";
import Carrito from "./components/Carrito";
import Ventas from "./components/Ventas";
import PDFDocument from "./components/PDFDocument";
import Envios from "./components/Envios";
import Novedades from "./components/Novedades";
import RSChatbot from "./components/RSChatbot";
import RSChatbot2 from "./components/RSChatbot2";
//import OpenAI_chatbot from "./components/OpenAI_chatbot";

import ProtectedRoute from "./ProtectedRoute";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import NewClient from "./components/NewClient";
import Login from "./components/Login";
import Analytics from "./components/Analytics";

function App({setShowLogin}) {
  const {user} = useContext(UserContext);

  const pageNotFound = () => {
    return (
      <div style={{ textAlign: "center", margin: "20%" }}>
        <h1>⚠ 404 NOT FOUND ⚠</h1>
        <h2>😒 Where are you trying to go?🧐</h2>
      </div>
    );
  };

  return (
    <div className="App">
      <ItemNavbar />

      <Routes>
      {/* <Route path="/login" element={<Login />} /> */}
      <Route path="/newuser" element={<NewClient />} />
      <Route path="/" element={<Home />} />
      <Route element={<ProtectedRoute isLogged={!user || (user.role === 'admin' || user.role === 'cliente')}/>}>
         <Route path="/novedades" element={<Novedades />} />
      </Route>
     

        <Route element={<ProtectedRoute isLogged={!user || (!!user && (user.role === 'admin' || user.role === 'cliente'))}/>}>
          
          <Route path="/productos" element={<TarjetasProductos />} />
          <Route path="/carrito" element={<Carrito />} />
        </Route>

        <Route element={<ProtectedRoute isLogged={!!user && user.role === 'admin'} />}>
          <Route path="/adm-clientes" element={<AdmCLientes />} />
          <Route path="/adm-empleados" element={<AdmEmpleados />} />
          <Route path="/adm-productos" element={<AdmProductos />} />
          <Route path="/adm-proveedores" element={<AdmProveedores />} />
          <Route path="/adm-users" element={<AdmUsers />} />
        </Route>

        <Route element={<ProtectedRoute isLogged={!!user && (user.role === 'admin' || user.role === 'almacen' || user.role === 'cliente')} />}>
          <Route path="/ventas" element={<Ventas />} />
        </Route>
        <Route element={<ProtectedRoute isLogged={!!user && (user.role === 'admin' || user.role === 'envios' || user.role === 'entregas'|| user.role === 'cliente')} />}>
          <Route path="/envios" element={<Envios />} />
          <Route path="/analytics" element={<Analytics />} />
        </Route>

        {/* EN DESARROOLLO */}
        <Route path="/pdf" element={<PDFDocument />} />
        {/* <Route path="/login" element={<Login />} /> */}

        <Route path="*" element={pageNotFound()} />
      </Routes>
      {/* <OpenAI_chatbot></OpenAI_chatbot> */}
      {/* <RSChatbot></RSChatbot> */}
      <RSChatbot2></RSChatbot2>
    </div>
  );
}

export default App;
