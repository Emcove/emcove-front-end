import axios from 'axios'

import { API_URL } from '../Constants'

import UserData from '../utils';

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
            const resp = await axios.get(`${API_URL}/users/login`);
            return resp;
        } catch (error) {
            return error.response;
        }
    }

    async getMyReputation() {
        try {
            const resp = await axios.get(`${API_URL}/users/myReputation`);
            let user = UserData.getUserFromStorage();
            if (user) {
                user.reputation = resp.data;
                localStorage.setItem('user', JSON.stringify(user));
            }
            return resp;
        } catch (error) {
            return error.response;
        }
    }

    async getMyBusinessReputation() {
        try {
            let user = UserData.getUserFromStorage();
            const resp = await axios.get(`${API_URL}/entrepreneurships/${user.entrepreneurship.id}/reputation`);
            if (user){
                let entrepreneurship = user.entrepreneurship;
                if(entrepreneurship){
                    user.entrepreneurship.reputation = resp.data;    
                }
                localStorage.setItem('user', JSON.stringify(user));
            }
            return resp;
        } catch (error) {
            return error.response;
        }
    }

    async deleteUser(username) {
        try {
            const resp = await axios.delete(`${API_URL}/users`);
            return resp;
        } catch (error) {
            return error.response;
        }
    }
}
export default new UserService()