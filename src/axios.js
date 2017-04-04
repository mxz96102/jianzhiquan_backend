import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://job.4nian.cc/com.cn.plurality/',
});

export default axiosInstance
