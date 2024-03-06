import axios, { AxiosResponse } from 'axios';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const APIManager = async <T>(url: string, method: HttpMethod, data?: any): Promise<T> => {
  try {
    let response: AxiosResponse<T>;
    if (method === 'GET') {
      response = await axios.get<T>(url);
    } else if (method === 'POST') {
      response = await axios.post<T>(url, data);
    } else if (method === 'PUT') {
      response = await axios.put<T>(url, data);
    } else if (method === 'DELETE') {
      response = await axios.delete<T>(url);
    } else {
      throw new Error('Unsupported HTTP method');
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default APIManager;
