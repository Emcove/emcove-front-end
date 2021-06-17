import axios from 'axios'

import { API_URL } from '../Constants'

class BusinessService {
  async registerFeedback(feedbackData) {
    const { entityId, username, title, description, value } = feedbackData;
    const body = {
      username,
      title,
      description,
      value
    };
    try {
        return await axios.post(`${API_URL}/entrepreneurships/${entityId}/reputation/comment`, body);
    } catch (error) {
        return error.response;
    }
  }
}

export default new BusinessService()