import axios from "axios";
import {EXPO_APP_BACKEND_URL} from "@env"

const URL = `${EXPO_APP_BACKEND_URL}/user`

// Add User
export const addUser = async (data) => {
    try {
        return await axios.post(`${URL}/addUser`, data);
    } catch (error) {
        console.error('Error While Connecting API:', error);
        return error.response ? error.response : { message: 'Unknown error occurred' };
    }
};

export const updateUser = async (id, userData) => {
    try {
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/updateUser/${id}`, userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating user', error);
        throw error;
    }
};

// Login user function
export const loginUser = async ({ username, password }) => {
    try {
        const response = await axios.post(`${URL}/loginUser`, { username, password });
        return response;
    } catch (error) {
        console.error('Error during login:', error);
        if (error.response) {
            return {
                status: error.response.status,
                message: error.response.data.message || 'An error occurred during login.'
            };
        }
        return { message: 'Unknown error occurred' };
    }
};

// Fetch User
// Fetch user details by userId
export const getUser = async (userId) => {
    try {
        const response = await axios.get(`${URL}/getUser/${userId}`); // Pass the userId in the URL
        return response.data; // Return the user details
    } catch (error) {
        console.error('Error while fetching user:', error);
        return null; // Return null on error
    }
};

