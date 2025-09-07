import axios from 'axios';
import { BASE_URL } from '../config'; // or wherever BASE_URL is defined

export const autoInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
