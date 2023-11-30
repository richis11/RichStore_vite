import React, { useState, useEffect, useContext } from "react";
import BarrasProdClien from "./little_components/BarrasProdClien";
import BarrasProdClien2 from "./little_components/BarrasProdClien2";
import { Container, Row, Col } from "react-bootstrap";
import venta_service from "../services/venta_service";
import cliente_service from "../services/cliente_service";
import { UserContext } from "../context/UserContext";

function Analythics() {
    const [clientes, SetClientes] = useState([])
    const {user} = useContext(UserContext)

    const getClientes = async () => {
        SetClientes(await cliente_service.getClientes());
      };

      const getProductosXcliente = async (userid) => {
       // SetTop10prods(await venta_service.getProductosXcliente(userid));
      };

      useEffect(() => {
        if(!!user && user.role === 'admin')
        {
         getClientes()
        }
        else if((!!user && user.role === 'cliente')){
          
        }
      }, []);
    


  return (
    <>
      <Container className="mt-3">
        <h1>Estadísticas 📉📊📈</h1>
        <hr />
        <Row>
            <Col>
                <BarrasProdClien clientes= {clientes}/>
            </Col>
            <Col>
                {/* <BarrasProdClien2 clientes= {clientes}/> */}
            </Col>
        </Row>
        


      </Container>
    </>
  );
}

export default Analythics;
