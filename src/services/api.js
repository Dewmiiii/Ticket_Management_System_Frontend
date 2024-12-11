import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/simulation';

export const startSimulation = async (config) => {
    return await axios.post(`${API_URL}/start`, config);
};

export const saveConfiguration = async (config) => {
    return await axios.post(`${API_URL}/save`, config);
};

export const getSimulationStatus = async () => {
    return await axios.get(`${API_URL}/status`);
};

