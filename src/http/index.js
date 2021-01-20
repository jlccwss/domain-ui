import axios from 'axios';
import { responseInterceptor, errorInterceptor } from './interceptors';

axios.defaults.withCredentials = true;

const instance = axios.create();

instance.interceptors.response.use(responseInterceptor, errorInterceptor);

export default instance;