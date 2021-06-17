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
}

export default new BusinessService()