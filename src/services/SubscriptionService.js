import axios from 'axios'

import { API_URL } from '../Constants'

class SubscriptionService {
    async getMPPreferences() {
      try {
        const resp =  await axios.get(`${API_URL}/entrepreneurships/subscriptions`);
        return resp;
      } catch (error) {
          return error.response;
      }
    }
}

export default new SubscriptionService();