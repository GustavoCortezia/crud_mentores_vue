import axios from "axios";
import { getUserToken } from './authentication';

const client = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// export const login = async (email: string, password: string) => {
//   try {
//     const response = await client.post('/auth', {
//       email,
//       password
//     });
//     sessionStorage.setItem('id', response.data.user.id);
//     return response;
//   } catch (error: any) {
//     return error?.response;
//   }
// };


export const login = async (email: string, password: string) => {
  try {
    const response = await client.post('/login', {
      email,
      password
    });
    console.log("email.value");
    if (response.status === 200) {
      const { data } = response.data
      sessionStorage.setItem('token', data.token)
    }

    return true
  } catch (error) {
    console.log(error)
    return false
  }
}



export async function logout() {
  const config = {
    headers: { Authorization: `Bearer ${getUserToken()}` }
  };
  try {
    return await client.delete('/logout', config);
  } catch (error: any) {
    return error?.reponse;
  }
}

export async function register(userData: any) {
  try {
    return await client.post('/users', userData);
  } catch (error: any) {
    return error?.response;
  }
}

export async function doGet(url: string) {
  try {
    const response = await client.get(url);

    return response?.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
