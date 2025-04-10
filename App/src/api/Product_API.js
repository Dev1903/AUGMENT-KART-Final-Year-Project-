import axios from "axios";
import {EXPO_APP_BACKEND_URL} from "@env"

const URL = `${EXPO_APP_BACKEND_URL}/products`

// Fetch Products
export const getSortedProducts = async ({ limit = 10, sortBy = 'createdAt', order = 'desc' }) => {
    try {
      const response = await axios.get(
        `${URL}/latest?limit=${limit}&sortBy=${sortBy}&order=${order}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching sorted products:', error);
      return [];
    }
  };

//Fetch Product by ID
export const getProduct = async (productId) => {
    try {
        const response = await axios.get(`${URL}/getProduct/${productId}`); // Pass the userId in the URL
        return response.data; // Return the user details
    } catch (error) {
        console.error('Error while fetching product:', error);
        return null; // Return null on error
    }
};

// Fetch Products by Category ID
export const getProductsByCategory = async (categoryId) => {
    try {
        const response = await axios.get(`${URL}/getProductsByCategory/${categoryId}`);
        return response.data; // Returns the array of products
    } catch (error) {
        console.error('Error while fetching products by category:', error);
        return []; // Return empty array on error
    }
};


// Update Product
export const updateProduct = async (id, productData) => {
    try {
        const response = await axios.put(`${URL}/updateProduct/${id}`, productData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating product', error);
        throw error;
    }
};

// Delete Product
export const deleteProduct = async (id) => {
    try {
        return await axios.delete(`${URL}/deleteProduct/${id}`);
    } catch (error) {
        console.error('Error While Deleting Product:', error);
        return error.response ? error.response : { message: 'Unknown error occurred' };
    }
};