import axios from 'axios'

import { API_URL } from '../Constants'

class UserService {
    async login(username, password) {
        let basicAuthHeader = 'Basic ' + window.btoa(username + ':' + password);
        try {
            const resp = await axios.get(`${API_URL}/users/login`,{
                headers:{
                    authorization:basicAuthHeader
                }
            });
            this.setupAxiosInterceptor(basicAuthHeader);
            return resp;
        } catch(error) {
            return error.response;
        }
    }

    async register(username, password, email, name, surname, city, adult) {
        const requestOptions = {
            username,
            password,
            email,
            name,
            surname,
            city,
            adult,
        };

        try {
            return await axios.post(`${API_URL}/users/register`,requestOptions);
        } catch (error) {
            return error.response;
        }
    }

    setupAxiosInterceptor(basicAuthHeader) {
        axios.interceptors.request.use(
            function (config) {
                config.headers.Authorization = basicAuthHeader;
                return config;
            }
        )
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