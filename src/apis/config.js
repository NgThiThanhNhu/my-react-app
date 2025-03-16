import axios from 'axios';

 const apiCall = async (method, endpoint, data, customHeaders ={}, 
    baseUrl = "https://localhost:7260")=>{
        const url = baseUrl?baseUrl+endpoint : endpoint; //nếu có baseurl thì nối với endpoint, nếu không thì thôi
        const headers={
            'Content-Type': 'application/json',
            ...customHeaders,
        };
        try{
            const response = await axios({
                method,
                url,
                data,
                headers
            });
            return response; //trả về dữ liệu khi thành công
        }catch(error){
     console.error('Error:', error);
     return{data:{isSuccess: false, message: error.message}} //trả về lỗi nếu có
        }
        
    };
 export default apiCall;

