import axios from 'axios';

const request = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: { Accept: 'application/json' },
    timeout: 10000,
});

export const get = async (path, options = {}) => {
    const res = await request.get(path, options);
    return res.data;
};

export const post = async (path, data, options = {}) => {
    const res = await request.post(path, data, options);
    return res.data;
};

export const put = async (path, data, options = {}) => {
    const res = await request.put(path, data, options);
    return res.data;
};

export default request;
