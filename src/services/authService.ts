import axios from 'axios';

const API_URL = 'http://localhost/api';

export async function login(email: string, password: string): Promise<string> {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    return response.data.token;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Invalid credentials.');
    } else {
      throw new Error('Network error.');
    }
  }
}

export function getToken(): string | null {
  return localStorage.getItem('jwt');
}

export function logout() {
  localStorage.removeItem('jwt');
}
