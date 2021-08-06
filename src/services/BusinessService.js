import axios from 'axios'

import { API_URL } from '../Constants'

class BusinessService {
  async createBusiness(data) {
    try {
      const resp =  await axios.post(`${API_URL}/entrepreneurships`, data, { headers: {
        authorization: localStorage.getItem('token'),
      }});
      let user = JSON.parse(localStorage.getItem("user"));
      user.entrepreneurship = resp.data;
      localStorage.setItem("user",JSON.stringify(user));
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
        return await axios.post(`${API_URL}/entrepreneurships/${entityId}/reputation/comment`, body, { headers: {
          authorization: localStorage.getItem('token'),
      }});
    } catch (error) {
        return error.response;
    }
  }

  async getOtherBusinessReputation(businessId) {

  }

  async getAllBusiness(data) {
    try {
      let resp;
      if (data) {
        resp = await axios.get(`${API_URL}/entrepreneurships`, { params: data, headers: {
          authorization: localStorage.getItem('token'),
      }});
      } else {
        resp = await axios.get(`${API_URL}/entrepreneurships`);
        
      } 
      return resp;
    } catch (error) {
        return error.response;
    }
  }

  async getBusinessByName(name) {
    try {
      return await axios.get(`${API_URL}/entrepreneurships/name/${name}`, { headers: {
        authorization: localStorage.getItem('token'),
    }});
    } catch (error) {
        return error.response;
    }
  }

  async getLoggedBusiness() {
    try {
      return await axios.get(`${API_URL}/entrepreneurships/logged`, { headers: {
        authorization: localStorage.getItem('token'),
    }});
    } catch (error) {
        return error.response;
    }
  }

  async sendOrder(order, businessId) {
    debugger;
    try {
      const response = await axios.post(`${API_URL}/entrepreneurships/${businessId}/order`, order, { headers: {
        authorization: localStorage.getItem('token'),
      }});
      debugger;
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async getBusinessOrders() {
    try {
      return await axios.get(`${API_URL}/entrepreneurships/orders`, { headers: {
        authorization: localStorage.getItem('token'),
    }});
    } catch (error) {
        return error.response;
    }
  }
}

export default new BusinessService()