import axios from 'axios'

const client = axios.create({
    baseURL: 'http://localhost:3001'
});

export const useAxios = () => {
    const get = async (url) => {
        try {
            const response = await client.get(url);
            return response.data;
        } catch (error) {
            console.error("❌ ~ get ~ error", error)
        }
    }

    const post = async (url, data) => {
        try {
            return client.post(url, data);
        } catch (error) {
            console.error("❌ ~ post ~ error", error)
        }
    }

    const del = async (url) => {
        try {
            return client.delete(url);
        } catch (error) {
            console.error("❌ ~ delete ~ error", error)
        }
    }

    return {
        get,
        post,
        del
    }
}