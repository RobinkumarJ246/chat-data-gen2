import axios from 'axios';
import https from 'https';

const axiosInstance = axios.create({
  baseURL: 'https://localhost:3001/api/auth',
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false
  })
});

export default axiosInstance;