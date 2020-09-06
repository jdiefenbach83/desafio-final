import http from '../http-common';

const get = (period) => {
  return http.get('/transaction?period=' + period);
};

const getById = (id) => {
  return http.get(`/transaction/${id}`);
};

const create = (data) => {
  return http.post('/transaction', data);
};

const update = (id, data) => {
  return http.put(`/transaction/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/transaction/${id}`);
};

export default {
  get,
  getById,
  create,
  update,
  remove,
};
