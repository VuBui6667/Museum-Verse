import axios from 'axios';

const axiosClient  = axios.create({
    baseURL: "https://64c3cac767cfdca3b6604d94.mockapi.io/",
    headers: {
        'Content-Type': 'application/json'
    },
});

axiosClient.interceptors.request.use(async (config) => {
    // Handle token here ...
    return config;
  });
  
  axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
      return response.data;
    }
  
    return response;
  }, (error) => {
    // Handle errors
    throw error;
  });

export default axiosClient