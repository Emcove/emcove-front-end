import axios from 'axios'

import { API_URL } from '../Constants'

class UserService {
    async updateUserData(avatar, name, surname, city, adult, email, password) {
        let loggedUser = JSON.parse(localStorage.getItem("user"));
        let requestOptions = {};

        if(loggedUser.avatar !== avatar){
            requestOptions.avatar = avatar;
        }
        if(loggedUser.name !== name){
            requestOptions.name = name;
        }
        if(loggedUser.surname !== surname){
            requestOptions.surname = surname;
        }
        if(loggedUser.city !== city){
            requestOptions.city = city;
        }
        if(loggedUser.adult !== adult){
            requestOptions.adult = adult;
        }
        if(loggedUser.email !== email){
            requestOptions.email = email;
        }
        if(password !== ''){
            requestOptions.password = password;
        }
        try{
            const resp = await axios.patch(`${API_URL}/users/update`,requestOptions);
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