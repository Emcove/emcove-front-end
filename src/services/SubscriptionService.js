import axios from 'axios'

import { API_URL } from '../Constants'

class SubscriptionService {
  async getMPPreferences(businessName) {
    try {
      const resp =  await axios.get(`${API_URL}/entrepreneurships/subscriptions?businessName=${businessName}`, { headers: {
        authorization: localStorage.getItem('token'),
    }});
      return resp;
    } catch (error) {
        return error.response;
    }
  }

  async subscribeBusiness(businessId, subscriptionType) {
    const data = {
      name: subscriptionType
    };

    try {
      const resp =  await axios.post(`${API_URL}/entrepreneurships/${businessId}/subscriptions`, data, { headers: {
        authorization: localStorage.getItem('token'),
      }});
      return resp;
    } catch (error) {
        return error.response;
    }
  }
}

export default new SubscriptionService();