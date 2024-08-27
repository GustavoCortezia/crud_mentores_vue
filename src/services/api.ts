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

    if (response.status === 200) {
      sessionStorage.setItem('token', response.data.token)
      console.log(response.data.token);
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

  console.log("Configuração de headers:", config);

  try {
    const response = await client.delete('/logout', config);
    console.log("Resposta do servidor:", response);
    return response;
  } catch (error: any) {
    console.error("Erro ao deslogar:", error?.response || error);
    return error?.response;
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

export const getMentor = async () => {
  const config = {
    headers: { Authorization: `Bearer ${getUserToken()}` }
  };
  try {
    const response = await client.get('/mentors', config);

    return response;
  } catch (error: any) {
    return error?.response;
  }
};

export async function registerMentor(name: string, email: string, cpf: string) {
  const config = {
    headers: { Authorization: `Bearer ${getUserToken()}` }
  };
  console.log(name, email, cpf)
  try {
    return await client.post('/mentors', {
      name,
      email,
      cpf
    },config );

  } catch (error: any) {
    return error?.response;
  }
}


export async function updateMentor(id:number, name: string, email: string, cpf: string) {
  const config = {
    headers: { Authorization: `Bearer ${getUserToken()}` }
  };
  console.log("teste: ",id, name, email, cpf)
  try {
    return await client.put(`/mentors/${id}`, {
      name,
      email,
      cpf
    },config );

  } catch (error: any) {
    return error?.response;
  }
}


export async function deleteMentor(id:number) {
  console.log('teste');
  const config = {
    headers: { Authorization: `Bearer ${getUserToken()}` }
  };
  try {
    console.log('teste');
    return await client.delete(`/mentors/${id}`, config);
  } catch (error: any) {
    return error?.reponse;
  }
}
