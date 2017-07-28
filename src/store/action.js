import axios from 'axios';

var retailer_path = '/api/retailer/index';

var login_path ='http://192.168.0.15:8080/order-zhd/loginApi/login?username=zhang&password=123123123';

export default {
    retailer({ commit }, value) {
        return axios.post(retailer_path, { query: value });
    },
    login({ commit }, value) {
        return axios.get(login_path, { query: value });
    }


}
