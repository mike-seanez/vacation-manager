import axios, { AxiosHeaders, AxiosInstance, AxiosRequestConfig } from "axios";
import { useJWT } from "./useJWT";

const instance = axios.create({
  baseURL: "http://localhost:4001/",
});

type HTTPRequestConfig = AxiosRequestConfig;

const api = (axios: AxiosInstance, params?: any) => {
  
  const getHeaders = async () => {
    const jwtService = useJWT();
    const jwt = await jwtService.getJWT();
    return new AxiosHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    });
  }

  return {
    get: async <T>(url: string, config: HTTPRequestConfig = {}) => {
      params && (config.params = params);
      return axios.get<T>(url, { headers: await getHeaders(), ...config });
    },
    delete: async <T>(url: string, config: HTTPRequestConfig = {}) => {
      params && (config.params = params);
      return axios.delete<T>(url, { headers: await getHeaders(), ...config });
    },
    put: async <T>(url: string, body: unknown, config: HTTPRequestConfig = {}) => {
      params && (config.params = params);
      return axios.put<T>(url, body, { headers: await getHeaders(), ...config });
    },
    patch: async <T>(url: string, body: unknown, config: HTTPRequestConfig = {}) => {
      params && (config.params = params);
      return axios.patch<T>(url, body, { headers: await getHeaders(), ...config });
    },
    post: async <T>(url: string, body: unknown, config: HTTPRequestConfig = {}) => {
      params && (config.params = params);
      return axios.post<T>(url, body, { ...config, headers: { ...await getHeaders(), ...config.headers } });
    },
  };
};

export const Http = api(instance);
