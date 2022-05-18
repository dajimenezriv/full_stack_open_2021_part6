import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => (await axios.get(baseUrl)).data;

const createNew = async (content) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const vote = async (object) => {
  const response = await axios.put(`${baseUrl}/${object.id}`, object);
  return response.data;
};

const exportObjects = {
  getAll,
  createNew,
  vote,
};

export default exportObjects;
