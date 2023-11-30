import api from "./api";

const baseURL = "/ventas";

const getVentas= async()=>{
    return (await api.get(`${baseURL}`)).data;
}
const getVenta= async(id)=>{
    return (await api.get(`${baseURL}/${id}`)).data;
}
const crearVenta = async(venta)=>{
    return (await api.post(`${baseURL}`, venta))
}
const editarVenta= async(id, venta)=>{
    return (await api.put(`${baseURL}/${id}`, venta));
}
const eliminarVenta= async(id)=>{
    return (await api.delete(`${baseURL}/${id}`));
}


const getVentasCliente= async(userid)=>{
    return (await api.get(`${baseURL}/cliente/${userid}`)).data;
}
const getProductosXcliente= async(userid)=>{
    return (await api.get(`${baseURL}/cliente/${userid}`)).data;
}
const getTop10productosXcliente= async(userid)=>{
    return (await api.get(`${baseURL}/clienteTop10Prods/${userid}`)).data;
}
const getTop10Productos= async()=>{
    return (await api.get(`${baseURL}/top10/prods`)).data;
}





export default {
    getVentas,
    getVenta,
    crearVenta,
    editarVenta,
    eliminarVenta,

    getVentasCliente,
    getProductosXcliente,
    getTop10productosXcliente,
    getTop10Productos
}