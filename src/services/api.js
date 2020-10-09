import axios from 'axios';

const api = axios.create({
  baseURL: 'http://ddragon.leagueoflegends.com/cdn/10.20.1/data/en_US/champion.json',
});

export default api;
