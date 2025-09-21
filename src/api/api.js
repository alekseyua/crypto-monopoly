import axios from 'axios';
import { NAV_AUTH_PAGE } from '../routers/config-nav';
import { getLocaleStore, initDataParamsPostOrGet, removeLocaleStore, setLocaleStore } from '../helpers/helper';
import { API_GET_TOKEN, API_GET_USER, API_REFRESH_TOKEN } from './config';
export const HOST = process.env.REACT_APP_HOST;

class ApiService {
    constructor() {
      this.api = axios.create({
        baseURL: HOST, // Базовый URL, например 'https://api.example.com'
        // withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      this.api.interceptors.request.use((config)=>{
        if (
          !getLocaleStore("token") ||
          getLocaleStore("token") === null ||
          getLocaleStore("token") === undefined
        ) {
          return config;
        }
          config.headers.Authorization = `Bearer ${getLocaleStore(
            "token"
          )}`;
        return config;
      })
      this.api.interceptors.response.use( async (response)=>{
        if(response.config.url === API_GET_TOKEN && response?.data?.access){
          const email = JSON.parse(response.config.data).email
          setLocaleStore("token", response?.data?.access);
          setLocaleStore('email', email)
          setLocaleStore("refresh", response?.data?.refresh);
          const res = await this.get(API_GET_USER,{
            email
          })
          const authResponse = {
            ...response,
            data: {
              ...response.data,
              profileData: res
            }
          }
          console.log({authResponse})
          return authResponse;
        }
        // console.log('step 5 interceptors',response)
        return response
      }, async (error)=>{
      // console.log('step 4 interceptors')
        
        const originResponse = error.config;
        console.log({ error }, error.status);
        if( error?.status === 401){
          try {
            if (
              error?.response?.data?.detail === "User not found" ||
              error?.response?.data?.detail ===
                "Given token not valid for any token type"
            ) {
              removeLocaleStore("email");
              removeLocaleStore("refresh");
              removeLocaleStore("token");
              window.location.href = NAV_AUTH_PAGE;
            }
              if (
                getLocaleStore("refresh") === undefined ||
                getLocaleStore("refresh") === null
              ) {
                removeLocaleStore("email");
                removeLocaleStore("refresh");
                removeLocaleStore("token");
                window.location.href = NAV_AUTH_PAGE;

              }
            ///token/refresh/
            const response = await this.api.post(HOST + API_REFRESH_TOKEN, {
              refresh: getLocaleStore("refresh"),
            });
            if (response && response.status === 401) {
              removeLocaleStore("access");
              removeLocaleStore("refresh");
              window.location.href = NAV_AUTH_PAGE;
            }
            localStorage.setItem("token", response.data.access);
            return this.api.request(originResponse.data);
          } catch (e) {
            
            this.handleError(e);
            return Promise.reject(e);          
          }
        }else if( error.response.status === 400){
          return error.response
        }

      })
    }
  
    // Метод GET-запроса
    async get(endpoint, params = {}) {
      try {
        const response = await this.api.get(endpoint, {
          params: initDataParamsPostOrGet(params),
        });
        if (response.status === 400) {
          return { data: response.data, status: response.status };
        }
        if (response.status === 200) {
          return { data: response.data, status: response.status };
        }
        return { data: response.data, status: response.status };
      } catch (error) {
        this.handleError(error);
        if(error?.response?.status === 401) return {detail: error.response.data.detail} /// ?
        if(error?.response?.status === 400) return {error: error.response.data.error} 
      }
    }
    
    // Метод POST-запроса
    async post(endpoint, data = {}, headers = {}) {
      try {
        const response = await this.api.post(endpoint, initDataParamsPostOrGet(data), { ...headers });
        if(response.status === 400){
          return { data: response.data, status: response.status };
        }
        if(response.status === 200){
          return { data: response.data, status: response.status };
        }
        return { data: response.data, status: response.status };
      } catch (error) {
        this.handleError(error);
        if(error?.response?.status === 400) return {...error.error}
      }
    }
  
    // Метод PUT-запроса
    async put(endpoint, data = {}) {
      try {
        const response = await this.api.put(endpoint, data);
        return response.data;
      } catch (error) {
        this.handleError(error);
      }
    }
  
    // Метод DELETE-запроса
    async delete(endpoint) {
      try {
        const response = await this.api.delete(endpoint);
        return response.data;
      } catch (error) {
        this.handleError(error);
      }
    }
  
    // Обработка ошибок
    handleError(error) {
      console.log({error})
      if (error.response) {
        console.error('Ошибка ответа:', error.response.status, error.response.data?.detail);
      } else if (error.request) {
        console.error('Ошибка запроса:', error.request);
      } else {
        console.error('Неизвестная ошибка:', error.message);
      }
    }
  }
  
  const api = new ApiService();
  export default api;