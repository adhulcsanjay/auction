import axios from 'axios';
import getApiUrl from './config';

const axiosInterceptorInstance = axios.create({
  baseURL: getApiUrl(), 
});


// Request interceptor
axiosInterceptorInstance.interceptors.request.use(
  (config) => {
    const session = (sessionStorage.getItem("session")) ? JSON.parse(sessionStorage.getItem("session")) : null;
    // If token is present add it to request's Authorization Header
    if (session) {
      config.headers.Authorization = `Bearer ${session.token}`;
      config.headers.sid = session.sid
    }
    return config;
  },
  (error) => {
    // Handle request errors here
    console.log(error)

    return Promise.reject(error);
  }
);
// End of Request interceptor



// Response interceptor
axiosInterceptorInstance.interceptors.response.use(
  (response) => {
    // Modify the response data here

    return response;
  },
  (error) => {
    // Handle response errors here
    if(error.response.status === 401){
      sessionStorage.clear();
      window.location.href = `${window.location.protocol}//${window.location.host}/auth/login`;
    }
    
    return Promise.reject(error);
  }
);
// End of Response interceptor

export default axiosInterceptorInstance;