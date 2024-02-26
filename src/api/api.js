import axios from './axios-default';

export function getShimpment (shipmentNumber) {
    return axios.get(`track/${shipmentNumber}`);
}
