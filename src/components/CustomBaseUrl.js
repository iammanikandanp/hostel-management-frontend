import axios from 'axios';

export const CustomBaseUrl = axios.create({
  baseURL: "https://hostel-management-backend-ha3i.onrender.com/api/v1",
});
