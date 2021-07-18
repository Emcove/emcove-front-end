import axios from 'axios'

import { API_URL } from '../Constants'
class UserService {
    async updateUserData(data) {
        try {
            const resp = await axios.patch(`${API_URL}/users/update`,data);
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
            return await axios.post(`${API_URL}/users/${entityId}/reputation/comment`, body);
        } catch (error) {
            return error.response;
        }
    }

    async getUserReputation(username) {
        try {
            const resp = await axios.get(`${API_URL}/users/reputation/${username}`);
            return resp;
        } catch (error) {
            return error.response;
        }
    }

    async getMyReputation() {
        try {
            const resp = await axios.get(`${API_URL}/users/reputation`);
         
            return resp;
        } catch (error) {
            return error.response;
        }
    }

    async getMyBusinessReputation() {
        try {
            const resp = await axios.get(`${API_URL}/entrepreneurships/reputation`);
            
            return resp;
        } catch (error) {
            return error.response;
        }
    }

    async deleteUser() {
        try {
            const resp = await axios.delete(`${API_URL}/users`);
            return resp;
        } catch (error) {
            return error.response;
        }
    }
}
export default new UserService()