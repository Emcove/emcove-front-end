import axios from 'axios'

import { API_URL } from '../Constants'

class AuthenticationService {
    async login(username, password) {
        let basicAuthHeader = 'Basic ' + window.btoa(username + ':' + password);
        localStorage.setItem('token', basicAuthHeader);
        try{
            const resp = await axios.get(`${API_URL}/users/login`, {
                headers: {
                    authorization: basicAuthHeader
                }
            });
            
            localStorage.setItem('user', JSON.stringify(resp.data));
            return resp;
        }catch(error){
            return error.response;
        }
    }

    async register(username, password, email, name, surname, city, adult) {
        const requestOptions = {
            username:username,
            password:password,
            email:email,
            name:name,
            surname:surname,
            city:city,
            adult:adult,
        };

        try{
            return await axios.post(`${API_URL}/users/register`, requestOptions, { headers: {
                authorization: localStorage.getItem('token'),
            }});
        }catch(error){
            return error.response;
        }
    }

    logout(){
        //delete axios.defaults.headers.common["Authorization"];
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }
}

export default new AuthenticationService();