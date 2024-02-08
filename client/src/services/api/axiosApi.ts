import axios, { AxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:5000/api/v1',
});

const axiosApi = {
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await axiosInstance.get<T>(url, config);

    return data;
  },

  async post<T, D>(url: string, body: D, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await axiosInstance.post<T>(url, body, config);

    return data;
  },

  async put<T, D>(url: string, body: D, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await axiosInstance.put<T>(url, body, config);

    return data;
  },

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await axiosInstance.delete<T>(url, config);

    return data;
  },
};

export default axiosApi;
