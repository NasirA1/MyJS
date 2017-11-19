import axios from 'axios'

function Axios(token) {
  const ENDPOINT_BASE_URL = 'http://192.168.0.14';
  const ENDPOINT_PORT = '8081';

  return axios.create({
    baseURL: `${ENDPOINT_BASE_URL}:${ENDPOINT_PORT}/`,
    headers: { 
     /* 'Authorization': `Bearer-${token}`, */
      'x-access-token': token
    }
  });
}


async function getAllContacts() {
  return Axios().get('contacts');
}

async function updateContact(contact, token) {
  return Axios(token).post('contacts', contact);
}

async function isMember(email) {
  return Axios().get(`members/${email}`);
}

async function register(user) {
  return Axios().post('register', user);
}

async function login(user) {
  return Axios().post('login', user);
}

export { getAllContacts, isMember, register, login, updateContact };
