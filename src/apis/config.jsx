import axios from 'axios';
import { useCookies } from 'react-cookie';  // Thêm thư viện react-cookie

const apiCall = async (method, endpoint, data = {}, customHeaders = {}, 
    baseUrl = "https://localhost:7260", withCredentials = true) => {  

    const url = baseUrl + endpoint;

    // Cấu hình headers mặc định
    const headers = {
        'Content-Type': 'application/json',
        ...customHeaders,
    };

    // // Nếu có token thì thêm vào Authorization header
    // if (token) {
    //     headers['Authorization'] = `Bearer ${token}`;
    // }

    try {
        const response = await axios({
            method,
            url,
            data,
            headers,
            withCredentials,  // Đảm bảo cookie sẽ được gửi
        });
        return response.data;  // Trả về dữ liệu khi thành công
    } catch (error) {
        console.error('Error:', error);
        return {
            isSuccess: false,
            message: error.response ? error.response.data.message : error.message,
        };
    }
};

export default apiCall;
