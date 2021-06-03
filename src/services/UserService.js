import axios from 'axios'

import { API_URL } from '../Constants'

class UserService {

    login(username,password){
        let basicAuthHeader = 'Basic ' + window.btoa(username + ':' + password);
        return fetch(`${API_URL}/users/login`,{
            headers:{
                authorization:basicAuthHeader
            }
        })
        .then(resp => {
            if (resp.ok) {
                console.log(resp.text)
                
                this.setupAxiosInterceptor(basicAuthHeader)
                localStorage.setItem('user', JSON.stringify(resp.text));

            }
            return resp.ok
        });

    }

    register(username,password,email,name,surname,city,adult){
        const requestOptions = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify({
                username: username,
                password: password,
                email: email,
                name: name,
                surname: surname,
                city: city,
                adult: adult
            })
            
        }
        console.log(adult)
        return (async () => {
            const resp = await fetch(`${API_URL}/users/register`,requestOptions)
            return resp
        })();
    }

    setupAxiosInterceptor(basicAuthHeader){
        axios.interceptors.request.use(
            function (config) {
                config.headers.Authorization = basicAuthHeader;
                return config;
            }
        )
    }
}

export default new UserService()