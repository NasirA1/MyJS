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


export { getAllContacts };
