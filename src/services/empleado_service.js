import api from "./api";

const baseURL = "/empleados";

const getEmpleados= async()=>{
    return (await api.get(`${baseURL}`)).data;
}
const getEmpleado= async(id)=>{
    return (await api.get(`${baseURL}/${id}`)).data;
}
const crearEmpleado = async(empleado)=>{
    return (await api.post(`${baseURL}`, empleado))
}
const editarEmpleado= async(id, empleado)=>{
    return (await api.put(`${baseURL}/${id}`, empleado));
}
const eliminarEmpleado= async(id)=>{
    return (await api.delete(`${baseURL}/${id}`));
}

export default {
    getEmpleados,
    getEmpleado,
    crearEmpleado,
    editarEmpleado,
    eliminarEmpleado
}