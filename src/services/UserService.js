import axios from 'axios'

import { API_URL } from '../Constants'

class UserService {
    async updateUserData(data) {
        try{
            const resp = await axios.patch(`${API_URL}/users/update`,data);
            localStorage.setItem('user', JSON.stringify(resp.data));
            return resp;
        }catch(error){
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
}
export default new UserService()