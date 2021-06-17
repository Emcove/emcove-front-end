import axios from 'axios'

import { API_URL } from '../Constants'

class BusinessService {
  async registerFeedback(feedbackData) {
    const { businessId, username, title, description, value } = feedbackData;
    const body = {
      username,
      title,
      description,
      value
    };
    try {
        return await axios.post(`${API_URL}/entrepreneurships/${businessId}/reputation/comment`, body);
    } catch (error) {
        return error.response;
    }
  }
}

export default new BusinessService()