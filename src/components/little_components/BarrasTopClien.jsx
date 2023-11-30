import React, { useContext, useState, useEffect, useCallback  } from "react";
import { Card, Row, Col, Form,Button } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto'; // Importa Chart.js
import { UserContext } from "../../context/UserContext";
import venta_service from "../../services/venta_service";




function BarrasTopClientes( ) {
const {user} = useContext(UserContext)
const [top10Clientes, SetTop10Clientes] = useState([])

const nombresClientes = top10Clientes.map(cliente => cliente.nombres);
const comprasProductos = top10Clientes.map(cliente => parseInt(cliente.cantidad_compras));
const dinero_gastado= top10Clientes.map(cliente => parseInt(cliente.dinero_gastado));




const getTop10Clientes= async () => {
  SetTop10Clientes(await venta_service.getTop10Clientes());
};



useEffect(() => {
  console.log('useEffect ejecutado con cliente:');

  const cargarDatos = async () => {
    
    try {
      await getTop10Clientes();
    } catch (error) {
      console.error('Error al obtener los productos más vendidos:', error);
    }
    
  };

  cargarDatos();
}, []);




 // Tus datos
 let etiketa = ''
 let texto = ''
 if(user.role ==='admin'){ etiketa = 'Compras', texto = '10 mejores clientes' }


 const data = {
  labels: nombresClientes,
  datasets: [
    // {
    //   label: 'Cantidad de Compras',
    //   data: comprasProductos,
    //   backgroundColor: 'rgba(54, 162, 235, 0.5)',
    //   borderColor: 'rgba(54, 162, 235, 1)',
    //   borderWidth: 1,
    // },
    {
      label: 'Dinero Gastado',
      data: dinero_gastado,
      backgroundColor: 'rgba(255, 206, 86, 0.5)',
      borderColor: 'rgba(255, 206, 86, 1)',
      borderWidth: 1,
    }
  ],
  };

  // Opciones de personalización
  const options = {
    // indexAxis:'y',
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
        <Card.Title>TOP 10 Clientes</Card.Title>

        <div style={{height:'100%'}}>
          <Bar data={data} options={options}/>
        </div>
      </Card.Body>
    </Card>
  );
}

export default BarrasTopClientes;
