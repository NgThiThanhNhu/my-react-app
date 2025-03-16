import { API_METHOD } from "../methods/method";
import apiCall from "./config";

export const BookCategoryApi ={
    create:(bookCategoryName)=>{
        const endpoint = `/api/BookCategory/AddBookCategory`;
        return apiCall(
            API_METHOD.POST, endpoint, bookCategoryName
        );
    },
    getList:()=>{
        const endpoint=`/api/BookCategory/GetAllBookCategory`;
        return apiCall(API_METHOD.GET, endpoint);
    },
    getCategoryById: (bookCategoryId)=>{
        const endpoint = `/api/BookCategory/GetBookCategoryById/${bookCategoryId}`;
        return apiCall(API_METHOD.GET, endpoint, bookCategoryId);
    },
    updateBookCategory: (bookCategoryId, bookCategoryName)=>{
const endpoint = `/api/BookCategory/UpdateBookCategory/${bookCategoryId}`;
return apiCall(API_METHOD.POST, endpoint, bookCategoryName);
    },
    deleteBookCategory: (bookCategoryId)=>{
        const endpoint = `/api/BookCategory/DeleteBookCategory/${bookCategoryId}`;
        return apiCall(API_METHOD.POST, endpoint, bookCategoryId);
    }
}