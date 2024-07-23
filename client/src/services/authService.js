import axios from "axios";


class UserService {
  static api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

  static registerUser(userData) {
    return UserService.api.post('/api/auth/register', userData);
  }

  static loginUser(credentials) {
    return UserService.api.post('/api/auth/login', credentials);
  }

}

export default UserService;
