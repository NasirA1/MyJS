import axios from 'axios'

function Axios() {
  const ENDPOINT_BASE_URL = 'http://192.168.0.14';
  const ENDPOINT_PORT = '8081';

  return axios.create({
    baseURL: `${ENDPOINT_BASE_URL}:${ENDPOINT_PORT}/` /*,
    headers: {
      Authorization: `Bearer ${store.state.token}`
    }*/
  });
}


async function getAllContacts() {
  return Axios().get('contacts');
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

export { getAllContacts, isMember, register, login };
