import axios from 'axios'

function Axios(token) {
  const ENDPOINT_BASE_URL = 'http://152.144.203.151';
  //const ENDPOINT_BASE_URL = 'http://172.28.229.226';
  const ENDPOINT_PORT = '8080';

  return axios.create({
    baseURL: `${ENDPOINT_BASE_URL}:${ENDPOINT_PORT}/`,
    headers: { 
     /* 'Authorization': `Bearer-${token}`, */
      'x-access-token': token
    }
  });
}


async function getAllContacts(token, pageSize, activePage) {
  return Axios(token).get(`contacts?pageSize=${pageSize}&activePage=${activePage}`);
}

async function insertContact(contact, token) {
  return Axios(token).put('contacts', contact);
}

async function deleteContacts(contactIds, token) {
  return Axios(token).post('contacts/delete', { ids: contactIds});
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


export { 
  getAllContacts, 
  isMember, 
  register, 
  login, 
  insertContact, 
  updateContact,
  deleteContacts
};
