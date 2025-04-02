import { API_METHOD } from "../methods/method";
import apiCall from "./config";
import { Cookies, withCookies } from "react-cookie";
import {cookies} from "../pages/authentication/Login"


export const Authentication ={
    login:(data)=>{
        const endpoint = `/api/Authentication/Login`;
        return apiCall(API_METHOD.POST, endpoint, data, {}, "https://localhost:7260",true); //việc truyền dữ liệu lần lượt theo đúng thứ tự từng tham số trong apicall
        //ví dụ ta bỏ , {}, "https://localhost:7260",true thì JavaScript sẽ tự động lấy giá trị mặc định được set bên apicall
    }
}

export const BookCategoryApi = {
    create: async (bookCategoryName) => {
        const endpoint = `/api/BookCategory/AddBookCategory`;
        
        return apiCall(API_METHOD.POST, endpoint, bookCategoryName);
    },
    getList: async () => {
        const endpoint = `/api/BookCategory/GetAllBookCategory`;
        // const token = cookies.authToken;  // Lấy token từ cookie
        return apiCall(API_METHOD.GET, endpoint, {});
    },
    getCategoryById: async (bookCategoryId) => {
        const endpoint = `/api/BookCategory/GetBookCategoryById/${bookCategoryId}`;
        // const token = cookies.authToken;  // Lấy token từ cookie
        return apiCall(API_METHOD.GET, endpoint, { bookCategoryId });
    },
    updateBookCategory: async (bookCategoryId, bookCategoryName) => {
        const endpoint = `/api/BookCategory/UpdateBookCategory/${bookCategoryId}`;
        // const token = cookies.authToken;  // Lấy token từ cookie
        return apiCall(API_METHOD.POST, endpoint, bookCategoryName);
    },
    deleteBookCategory: async (bookCategoryId) => {
        const endpoint = `/api/BookCategory/DeleteBookCategory/${bookCategoryId}`;
        // const token = cookies.authToken;  // Lấy token từ cookie
        return apiCall(API_METHOD.POST, endpoint, { bookCategoryId });
    }
}

export const BookChapterApi ={
    create: async (titleChapter)=>{
        const endpoint = `/api/BookChapter/AddBookChapter`;
        return apiCall(API_METHOD.POST, endpoint, titleChapter);
    },
    getList: async ()=>{
        const endpoint = `/api/BookChapter/GetAllBookChapter`;
        return apiCall(API_METHOD.GET, endpoint);
    },
    getChapterById: async (bookChapterId) => {
        const endpoint = `/api/BookChapter/GetBookChapterById/${bookChapterId}`;
        // const token = cookies.authToken;  // Lấy token từ cookie
        return apiCall(API_METHOD.GET, endpoint, bookChapterId);
    },
    updateBookChapter: async (bookChapterId, titleChapter) => {
        const endpoint = `/api/BookChapter/UpdateBookChapter/${bookChapterId}`;
        // const token = cookies.authToken;  // Lấy token từ cookie
        return apiCall(API_METHOD.POST, endpoint, titleChapter);
    },
    deleteBookChapter: async (bookChapterId) => {
        const endpoint = `/api/BookChapter/DeleteBookChapter/${bookChapterId}`;
        // const token = cookies.authToken;  // Lấy token từ cookie
        return apiCall(API_METHOD.POST, endpoint, bookChapterId );
    }
}