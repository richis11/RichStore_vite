import api from "./api";

const baseURL = "/envios";

const getEnvios = async () => {
  return (await api.get(`${baseURL}`)).data;
};

const getEnvio = async (id) => {
  return (await api.get(`${baseURL}/${id}`)).data;
};

const getEnviosCliente = async (userid) => {
  return (await api.get(`${baseURL}/cliente/${userid}`)).data;
};

const crearEnvio = async (envio) => {
  return (await api.post(`${baseURL}`, envio));
};

const editarEnvio = async (id, envio) => {
  return (await api.put(`${baseURL}/${id}`, envio));
};

const eliminarEnvio = async (id) => {
  return (await api.delete(`${baseURL}/${id}`));
};

export default {
  getEnvios,
  getEnvio,
  getEnviosCliente,
  crearEnvio,
  editarEnvio,
  eliminarEnvio,
};
