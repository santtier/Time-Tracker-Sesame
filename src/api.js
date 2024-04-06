import axios from 'axios';

const api = axios.create({
 baseURL: 'https://api-test.sesametime.com/schedule/v1',
 headers: {
    'Authorization': 'Bearer 16e2f0694a311151c01aa0a131b94a5a3ad7f110e12c2d8f459fcbb158214f5f'
 }
});

export default api;