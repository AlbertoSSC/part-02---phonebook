import axios from 'axios';

const getContactList = () => {
  const request = axios.get('http://localhost:3002/persons');
  return request.then(response => response.data);
};

const addContact = contact => {
  const request = axios.post('http://localhost:3002/persons', contact);
  return request.then(response => response.data);
};

const deleteContact = id => {
  const request = axios.delete(`http://localhost:3002/persons/${id}`);
  return request;
};

const updateContact = (id, contact) => {
  const request = axios.patch(`http://localhost:3002/persons/${id}`, contact);
  return request.then(response => response.data);
};

export default { getContactList, addContact, deleteContact, updateContact };
