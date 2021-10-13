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
  
  async patchBusiness(data){
    try {
      const resp =  await axios.patch(`${API_URL}/entrepreneurships`, data, { headers: {
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
        resp = await axios.get(`${API_URL}/entrepreneurships`, { headers: {
          authorization: localStorage.getItem('token'),
      }});
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
    try {
      const response = await axios.post(`${API_URL}/entrepreneurships/${businessId}/order`, order, { headers: {
        authorization: localStorage.getItem('token'),
      }});
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async getBusinessOrders(status) {
    try {
      return await axios.get(`${API_URL}/entrepreneurships/orders`, { params: { orderState: status }, headers: {
        authorization: localStorage.getItem('token'),
    }});
    } catch (error) {
        return error.response;
    }
  }

  async updateOrderStatus(orderId, newStatus) {
    try {
      const response = await axios.post(`${API_URL}/entrepreneurships/orders/${orderId}/orderTracking?newOrderState=${newStatus}`, {}, { headers: {
        authorization: localStorage.getItem('token'),
      }});

      return response;
    } catch (error) {
      return error.response;
    }
  }

  async createBusinessCalendar(businessId, calendarId) {
    try {
      const response = await axios.post(`${API_URL}/entrepreneurships/${businessId}/calendar?calendarId=${calendarId}`, {}, { headers: {
        authorization: localStorage.getItem('token'),
      }});

      return response;
    } catch (error) {
      return error.response;
    }
  }

  async addDeliveryPoint(deliveryPoint) {
    try {
      const response = await axios.post(`${API_URL}/entrepreneurships/deliveryPoints`, deliveryPoint, { headers: {
        authorization: localStorage.getItem('token'),
      }});

      return response;
    } catch (error) {
      return error.response;
    }
  }
}

export default new BusinessService()