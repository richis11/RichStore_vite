import React, { useContext, useState, useEffect, useCallback  } from "react";
import { Card, Row, Col, Form,Button } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import { UserContext } from "../../context/UserContext";
import cliente_service from "../../services/cliente_service";
import venta_service from "../../services/venta_service";


function Barras( {clientes=[]} ) {
const {user} = useContext(UserContext)
const [cliente, SetCliente] = useState(null)
const [top10prods, SetTop10prods] = useState([])

const nombresProductos = top10prods.map(producto => producto.nombre);
const ventasProductos = top10prods.map(producto => parseInt(producto.cantidad_total));


const getCliente = async (id) => {
  return await cliente_service.getCliente(id);
};
const getTop10productosXcliente = async (userid) => {
  SetTop10prods(await venta_service.getTop10productosXcliente(userid));
};
const getTop10Productos = async () => {
  SetTop10prods(await venta_service.getTop10Productos());
};


const seleccionarCliente = useCallback(async (id) => {
  if (id !== "0") { // Asegúrate de que el valor de id sea una cadena
    try {
      const clienteObtenido = await getCliente(id);
      SetCliente(clienteObtenido);
      await getTop10productosXcliente(clienteObtenido.userid);
    } catch (error) {
      console.error('Error al obtener el cliente o los productos:', error);
      SetCliente(null);
    }
  } else {
    // Cuando se selecciona "Todos los clientes"
    SetCliente(null);
    try {
      await getTop10Productos();
    } catch (error) {
      console.error('Error al obtener los productos más vendidos:', error);
    }
  }
}, []);

useEffect(() => {
  console.log('useEffect ejecutado con cliente:', cliente);

  const cargarDatos = async () => {
    if (cliente && cliente.userid) {
      try {
        await getTop10productosXcliente(cliente.userid);
      } catch (error) {
        console.error('Admin: Error al obtener los productos más vendidos por cliente:', error);
      }
    }
    else {
      if(user.role ==='admin')
      {
        try {
          await getTop10Productos();
        } catch (error) {
          console.error('Error al obtener los productos más vendidos:', error);
        }
      }
      else{
        try {
          await getTop10productosXcliente(user.userid);
        } catch (error) {
          console.error('Error al obtener los productos más vendidos por cliente:', error);
        }
      }
      
    }
  };

  cargarDatos();
}, [cliente]);




 // Tus datos
 let etiketa = ''
 let texto = ''
 if(user.role ==='admin'){ etiketa = 'Ventas', texto = '10 productos mas vendidos' }
 else{etiketa  = 'Compras', texto = '10 productos mas comprados'}

 const data = {
    labels: nombresProductos,
    datasets: [
      {
        label: etiketa,
        data: ventasProductos,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Opciones de personalización
  const options = {
    //indexAxis:'y',
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // Puedes cambiar la posición de la leyenda
      },
      title: {
        display: true,
        text: texto,
      },
    },
  };

  return (
    <Card style={{ width: "32rem", margin: "10px", height:'50vh' }}>
      

      <Card.Body>
        <Card.Title>TOP 10 Productos</Card.Title>
        {!!user && user.role === 'admin' &&
          <>
          {/* <h5>Modo admin!</h5> */}
          <span>Seleccionar cliente:</span>
          <Form.Select
            name="cliente"
            onChange={(e) => seleccionarCliente(e.target.value)}
          >
            <option key={0} value={0}>
              Todos los clientes
            </option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nombres}
              </option>
            ))}
          </Form.Select>
          </>
          }

        <div style={{height:'100%'}}>
          <Bar data={data} options={options}/>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Barras;
