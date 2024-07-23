import axios from 'axios'
import {jwtDecode} from "jwt-decode";
import dayjs from 'dayjs'
import { useAuth } from '../context/AuthContext'


const baseURL = process.env.REACT_APP_API_URL;


const useAxios = ({authRequired = true}) => {
    const {tokens, setTokens} = useAuth()

    const axiosInstance = axios.create({
        baseURL: `${baseURL}/api`,
        headers:{Authorization: `Bearer ${tokens?.access}`}
    });


    axiosInstance.interceptors.request.use(async req => {
    
        if(authRequired)
        {
            const user = jwtDecode(tokens.access)
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    
        if(!isExpired) return req
    
        const response = await axios.post(`${baseURL}/api/auth/refresh-token/`, {
            refresh: tokens.refresh
          });
        
        setTokens(response.data)
        
        req.headers.Authorization = `Bearer ${response.data.access}`
        }
        return req
    })
    
    return axiosInstance
}

export default useAxios;