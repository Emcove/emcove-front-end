import axios from 'axios'

import { API_URL } from '../Constants'

class BusinessService {
    async createBusiness(data) {
        try{
            const resp =  await axios.post(`${API_URL}/entrepreneurships`,data);
            let user = JSON.parse(localStorage.getItem("user"));
            user.entrepreneurship = resp.data;
            localStorage.setItem("user",JSON.stringify(user));
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
    debugger;
    try {
        return await axios.post(`${API_URL}/entrepreneurships/${entityId}/reputation/comment`, body);
    } catch (error) {
        return error.response;
    }
  }

  async getOtherBusinessReputation(businessId){

  }

}

export default new BusinessService()