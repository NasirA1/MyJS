import axios from 'axios'

function Axios() {
  return axios.create({
    baseURL: `http://localhost:8081/` /*,
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
