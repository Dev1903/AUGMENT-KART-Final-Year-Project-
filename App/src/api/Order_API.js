import axios from "axios";

import {EXPO_APP_BACKEND_URL} from "@env";

const URL = `${EXPO_APP_BACKEND_URL}/orders`

//Create Order
export const createOrder = async (orderData) => {
    try {
        console.log("RESULT RZP:", orderData)
        const result = await axios.post(`${URL}/createOrder`, orderData);
        return result.data;
    } catch (error) {
        console.error('Error while creating order:', error);
        throw error;
    }
};

//fetch order
export const getUserOrders = async (userId) => {
    // //console.log(userId);
    try {
        const response = await axios.get(`${URL}/orders/${userId}`);
        
        return response.data;
    } catch (error) {
        console.error('Error fetching user orders:', error);
        throw error;
    }
};

// Fetch Orders
export const getOrders = async () => {
    try {
        const response = await axios.get(`${URL}/orders`);
        // Ensure the response is treated as an array
        return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
        console.error('Error While Fetching Orders:', error);
        return []; // Return an empty array on error
    }
};