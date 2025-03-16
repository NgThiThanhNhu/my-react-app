import React,{useState, useEffect} from "react";
import { BookCategoryApi } from "../apis"; //import API
import { data, useNavigate } from "react-router-dom"; //dùng để chuyển trang sau khi thêm thành công
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from "primereact/inputtext";
import 'primeicons/primeicons.css'; // Đảm bảo rằng PrimeIcons đã được import

import { Button } from "primereact/button";  // Thêm Button từ PrimeReact
import { Dialog } from "primereact/dialog";  // Dùng Dialog từ PrimeReact





const BookCategory =()=>{
    const[bookCategories, setBookCategories]=useState([]);
    const[error, setError]=useState(null);
    const[bookCategoryName, setbookCategoryName] = useState('');
    const[loading, setloading] = useState('');
    const[visible, setVisible]=useState(false);
    const[adding, setAdding] = useState(false);
    //xây dựng usestate getcateId
    const[bookCategoryId, setbookCategoryId] = useState('');
    const[visibleGetCategoryById, setvisibleGetCategoryById]=useState(false);
    const[loadingId, setloadingId] = useState(false);
    const[categoryId, setcategoryId] = useState(null);
    //xây dựng updatebookcategory
    const[updatebookcategory, setupdatebookcategory] = useState(null);
    const[visibleUpdate, setVisibleUpdate] = useState(false);
    //deleteBookCategory
    const[visibleDelete, setVisibleDelete] = useState(false);
    const[deleteBookCategory, SetDeleteBookCategory] = useState('');




    useEffect(()=>{//useeffect gọi api sau khi render
        const fetchbookCategories = async()=>{
         try{
             const response = await BookCategoryApi.getList();
            
             console.log("Danh sách: ", response.data);

             if(response.data && Array.isArray(response.data.data)){

                 setBookCategories(response.data.data); //cập nhật usestate
             }else {
                console.error("Dữ liệu không hợp lệ:", response.data);
                setBookCategories([]); // Đảm bảo dữ liệu không bị lỗi
            }

 
         }catch(error){
         console.log("Lỗi khi lấy danh sách", error);
         setError("Không tải được danh sách");
         setBookCategories([]); // Tránh lỗi khi DataTable render
     }finally{
         setloading(false);
     }
    
    };
    fetchbookCategories();
 }, []);
 
    const handleSubmit = async(e)=>{
        e.preventDefault();
        setloading(true);
        
        try{
            const response = await BookCategoryApi.create({name: bookCategoryName}); //phải giống với key mà api yêu cầu
            if(response.data.isSuccess && response.data.data.id){
                
                alert('Thêm categoryName thành công!'+ response.data.data.name);
                setBookCategories(prev => [...prev, response.data.data]); 
                setVisible(false);//đóng popup
                setbookCategoryName(''); // Reset input
               
            }else{
                alert('Lỗi:'+ response.data.message);
            }
        }catch(error){
            alert('Có lỗi, không thêm được tên');
        }finally{
            setloading(false);
        }
    };
    
    // xây dựng hàm xử lý để lấy dữ liệu và tương tác với database
    const handleGetBookCategoryById = async(e)=>{
        e.preventDefault();
        setloading(true);
        try{
            const response = await BookCategoryApi.getCategoryById(bookCategoryId);
            if(response.data.data.id == bookCategoryId){
                setcategoryId(response.data.data);
            }else{
                console.log("Lỗi", bookCategoryId);
            }
        }catch(error){
            console.log("có lỗi không lấy được tên category bằng id", error);
        }finally{
            setloading(false);
        }
    };

    const openDialog =()=>{
        setcategoryId(null);
        setbookCategoryId('');
        setvisibleGetCategoryById(true);
    }
    
    //xây dựng hàm update
    const  handleUpdateCategory =async(e)=>{
        e.preventDefault();
        setloading(true);
        try{
            const response = await BookCategoryApi.updateBookCategory( bookCategoryId ,{name: bookCategoryName.name}  );
            console.log("id"+ bookCategoryId);
            console.log("name" + bookCategoryName.name);
            // Kiểm tra phản hồi từ server
        if (response.data.isSuccess) {
            const updatedCategory = response.data.data.name;
            alert("Cập nhật thành công: " + updatedCategory);

        } else {
            alert("Lỗi: "+ response.data.message);
        }
        }catch(error){
            console.log("Có lỗi ở khâu kiểm tra id", error);
        }finally{
            setloading(false);
        }
    }
    
    const openDialogUpdate =()=>{
        setcategoryId(null);
        setupdatebookcategory('');
            setVisibleUpdate(true);
    }
    //hàm xử lý delete
    const handleDeleteCategory = async(e)=>{
        e.preventDefault();
        setloading(true);
        try{
            const response = await BookCategoryApi.deleteBookCategory(bookCategoryId);
            console.log("id:"+bookCategoryId);
            
            if (response.data.isSuccess) {
               
                alert("Xóa thành công");
    
            } else {
                alert("Lỗi: "+ response.data.message);
            }
        }catch(error){
            console.log("Lỗi không xóa được", error);
        }finally{
            setloading(false);
        }
    }

    const openDialogDelete=(id)=>{
        setbookCategoryId(id);  // Gán bookCategoryId cho dòng cần xóa
        SetDeleteBookCategory('');
        setVisibleDelete(true);
    }
    //định nghĩa hàm actionTemplate
    const actionBodyTemplate = (rowData)=>{
        return(
            <div className="flex gap-2">
            {/* Nút Sửa */}
            <Button
                icon="pi pi-pencil"
                className="p-button-rounded p-button-success"
                onClick={() => openDialogUpdate(rowData)}
                tooltip="Cập nhật"
            />

            {/* Nút Xóa */}
            <Button
                icon="pi pi-trash"
                className="p-button-rounded p-button-danger"
                onClick={() => openDialogDelete(rowData.id)}
                tooltip="Xóa"
            />
            </div>
        )
    }

    return(
        <div className="card">
            <Button  tooltip="Thêm" icon="pi pi-plus" className="p-button=success mb-3" onClick={()=>setVisible(true)}/>
                <Button tooltip="tìm kiếm" icon="pi pi-search" className="btn-getbyid" onClick={openDialog}/>
               

            <DataTable value={bookCategories} paginator showGridlines rows={10} loading={loading} dataKey="id">
                <Column field="id" header="Book Category Id" style={{ minWidth: "12rem" }}/>
                
                <Column field="name" header="Book Category Name" style={{ minWidth: "12rem" }}/>
                <Column header="Action" body={actionBodyTemplate} style={{ minWidth: "12rem", textAlign: "center" }}/>
              
            </DataTable>
             {/*Popup thêm category */}
             <Dialog header="Add Book Category" visible={visible} style={{ width: "40vw" }} onHide={() => setVisible(false)} className="AddBookCategorylog">
                <div>
                    <label>
Tên thể loại sách:
                    </label>
                    <InputText value={bookCategoryName} onChange={(e) => setbookCategoryName(e.target.value)} className="w-full mb-3" required />
                    
                    <Button label="Thêm" icon="pi pi-check" className="p-button-success" onClick={handleSubmit} disabled={adding}/>
                </div>
             </Dialog>

             <Dialog header="Get Book Category By Id" visible={visibleGetCategoryById} style={{ width: "40vw" }} onHide={()=>setvisibleGetCategoryById(false)} className="GetCategorybyIdlog">
                <div>
                    <label>Nhập bookCategoryId: </label>
                    <InputText value={bookCategoryId} onChange={(e)=> setbookCategoryId(e.target.value)} required/>
                    <Button label="tìm kiếm" icon="pi pi-check" onClick={handleGetBookCategoryById} disabled={adding}/>
                    {/*Hiển thị kết quả nếu có */}
                    {categoryId && (
                        <div style={{ marginTop: "20px" }}>
                            <p><strong>ID:</strong> {categoryId.id}</p>
                            <p><strong>Name:</strong> {categoryId.name}</p>
                        </div>
                    )}
                </div>
             </Dialog>

             <Dialog header="Update Book Category" visible={visibleUpdate} style={{ width: "40vw" }} onHide={()=>setVisibleUpdate(false)} className="UpdateCategorylog" >
                <div>
                    <label>Nhập id: </label>
                    <InputText value={bookCategoryId} onChange={(e)=> setbookCategoryId(e.target.value)} className="" required />
                    <label>Cập nhật tên: </label>
                    <InputText value={bookCategoryName?.name || ''}  onChange={(e) => setbookCategoryName({ ...bookCategoryName, name: e.target.value })}  required />
                    
                    <Button label="Cập nhật" icon="pi pi-check" className="" onClick={handleUpdateCategory}  disabled={adding}/>
                     {/*Hiển thị kết quả nếu có 
                     {updatebookcategory && (
                        <div style={{ marginTop: "20px" }}>
                            <p><strong>ID:</strong> {updatebookcategory.id}</p>
                            <p><strong>Name:</strong> {updatebookcategory.name}</p>
                        </div>
                    )} */}
                </div>
             </Dialog>
             <Dialog header="Delete Book Category" visible={visibleDelete} style={{ width: "40vw" }} onHide={()=>setVisibleDelete(false)} className="UpdateCategorylog">
                <div>
                <label>Nhập id: </label>
                <InputText value={bookCategoryId} onChange={(e)=> setbookCategoryId(e.target.value)} className="" required />
                </div>
                <div>
                <Button label="Xóa" icon="pi pi-trash" className="" onClick={handleDeleteCategory}  disabled={adding}/>
                </div>
             </Dialog>
        </div>
);
};

     

export default BookCategory;

