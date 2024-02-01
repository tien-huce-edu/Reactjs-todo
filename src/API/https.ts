import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://65bb53e952189914b5bbc0cc.mockapi.io/',
});

export const fetchAllTodo = async () => {
  const res = await instance.get('tasks');
  return res.data;
};
