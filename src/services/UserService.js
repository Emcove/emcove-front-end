import axios from 'axios'

import { API_URL } from '../Constants'
class UserService {
    async updateUserData(data) {
        try {
            const resp = await axios.patch(`${API_URL}/users/update`, data, { headers: {
                authorization: localStorage.getItem('token'),
            }});
            localStorage.setItem('user', JSON.stringify(resp.data));
            return resp;
        } catch(error) {
            return error.response;
        }
    }

    async registerFeedback(feedbackData) {
        const { entityId, username, title, description, value } = feedbackData;
        const body = {
            username,
            title,
            description,
            value
        };
        try {
            return await axios.post(`${API_URL}/users/${entityId}/reputation/comment`, body, { headers: {
                authorization: localStorage.getItem('token'),
            }});
        } catch (error) {
            return error.response;
        }
    }

    async getUserReputation(userId) {
        try {
            const resp = await axios.get(`${API_URL}/users/${userId}/reputation`, { headers: {
                authorization: localStorage.getItem('token'),
            }});
            return resp;
        } catch (error) {
            return error.response;
        }
    }

    async getMyReputation() {
        try {
            const resp = await axios.get(`${API_URL}/users/reputation`, { headers: {
                authorization: localStorage.getItem('token'),
            }});
         
            return resp;
        } catch (error) {
            return error.response;
        }
    }

    async getBusinessReputation(businessId) {
        try {
            const resp = await axios.get(`${API_URL}/entrepreneurships/${businessId}/reputation`, { headers: {
                authorization: localStorage.getItem('token'),
            }});
            return resp;
        } catch (error) {
            return error.response;
        }
    }

    async deleteUser() {
        try {
            const resp = await axios.delete(`${API_URL}/users`, { headers: {
                authorization: localStorage.getItem('token'),
            }});
            return resp;
        } catch (error) {
            return error.response;
        }
    }

    async getUserOrders() {
        try {
          return await axios.get(`${API_URL}/users/orders`, { headers: {
            authorization: localStorage.getItem('token'),
        }});
        } catch (error) {
            return error.response;
        }
    }

    async addDeliveryPoint(deliveryPoint) {
        try {
            const response =  await axios.post(`${API_URL}/users/deliveryPoints`, deliveryPoint, { headers: {
                authorization: localStorage.getItem('token'),
            }});
            localStorage.setItem('user', JSON.stringify(response.data));
            return response;
        } catch (error) {
            return error.response;
        }
    }
}
export default new UserService()