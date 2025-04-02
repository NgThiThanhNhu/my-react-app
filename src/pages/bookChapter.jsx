import React,{useState, useEffect} from "react";
import { BookChapterApi } from "../apis";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from "primereact/inputtext";
import 'primeicons/primeicons.css'; // Đảm bảo rằng PrimeIcons đã được import

import { Button } from "primereact/button";  // Thêm Button từ PrimeReact
import { Dialog } from "primereact/dialog";  // Dùng Dialog từ PrimeReact
import "../styles/bookChapter.css";
const BookChapter=()=>{
    const [titleChapter, setTitleChapter] = useState('');
    const [Visible, setVisible] = useState(false);
   
    const [loading, setLoading] = useState('');
    //getbookchapter
    const [BookChapters, setBookChapters] = useState([]);
    //xây dựng usestate getcateId
    const[bookChapterId, setbookChapterId] = useState('');
    const[visibleGetChapterById, setvisibleGetChapterById]=useState(false);
    const[loadingId, setloadingId] = useState(false);
    const[chapterId, setchapterId] = useState(null);
    //xây dựng updatebookcategory
    const[updatebookcategory, setupdatebookchapter] = useState(null);
    const[visibleUpdate, setVisibleUpdate] = useState(false);
    //deleteBookCategory
    const[visibleDelete, setVisibleDelete] = useState(false);
    const[deleteBookChapter, SetDeleteBookChapter] = useState('');

    const handleAddBookChapterSubmit = async (e)=>{
        e.preventDefault();
        try {
            const response = await BookChapterApi.create({titleChapter: titleChapter});
            console.log("yêu cầu:", response.data);
            if(response.isSuccess){
                alert("Thêm thành công! " + response.data.titleChapter);
                setTitleChapter(prev => [...prev, response.data]); 
                setVisible(false);//đóng popup
                setTitleChapter(''); // Reset input
            }else{
                alert("Lỗi: " + response.data.message);
            }
        } catch (error) {
            alert("Có lỗi, không thêm được", error);
        }finally{
            setLoading(false);
        }
        
    }

    useEffect(()=>{//useeffect gọi api sau khi render
            const fetchbookChapters = async()=>{
             try{
                 const response = await BookChapterApi.getList();
                 if(response.data && Array.isArray(response.data)){
    
                    setBookChapters(response.data); //cập nhật usestate
                 }else 
                 {
                    console.error("Dữ liệu không hợp lệ:", response.data);
                    setBookChapters([]); // Đảm bảo dữ liệu không bị lỗi
                 }
    
     
                }catch(error){
             console.log("Lỗi khi lấy danh sách", error);
             setBookChapters([]); // Tránh lỗi khi DataTable render
         }finally{
            setLoading(false);
         }
        
        };
        fetchbookChapters();
     }, []);

    const handleGetBookChapterById = async(e)=>{
            e.preventDefault();
            setLoading(true);
            try{
                const response = await BookChapterApi.getChapterById(bookChapterId);
                if(response.data.id == bookChapterId){
                    setchapterId(response.data);
                }else{
                    console.log("Lỗi", bookChapterId);
                }
            }catch(error){
                console.log("có lỗi không lấy được tên category bằng id", error);
            }finally{
                setLoading(false);
            }
        };

        //xây dựng hàm update
    const  handleUpdateChapter =async(e)=>{
        e.preventDefault();
        setLoading(true);
                try{
                    const response = await BookChapterApi.updateBookChapter( bookChapterId ,{titleChapter: titleChapter.titleChapter}  );
                    // Kiểm tra phản hồi từ server
                if (response.isSuccess) {
                    const updatedChapter = response.data.titleChapter;
                    alert("Cập nhật thành công: " + updatedChapter);
        
                } else {
                    alert("Lỗi: "+ response.message);
                }
                }catch(error){
                    console.log("Có lỗi ở khâu kiểm tra id", error);
                }finally{
                    setLoading(false);
                }
    }

    const handleDeleteChapter = async(e)=>{
            e.preventDefault();
            setLoading(true);
            try{
                const response = await BookChapterApi.deleteBookChapter(bookChapterId);
                console.log("id:"+ bookChapterId);
                
                if (response.isSuccess) {
                   
                    alert("Xóa thành công");
        
                } else {
                    alert("Lỗi: "+ response.message);
                }
            }catch(error){
                console.log("Lỗi không xóa được", error);
            }finally{
                setLoading(false);
            }
    }

    const openDialog =()=>{
        setchapterId(null);
        setbookChapterId('');
        setvisibleGetChapterById(true);
    }
    const openDialogUpdate =()=>{
        setchapterId(null);
        setupdatebookchapter('');
        setVisibleUpdate(true);
    }

    const openDialogDelete=(id)=>{
        setbookChapterId(id);  // Gán bookCategoryId cho dòng cần xóa
        SetDeleteBookChapter('');
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
                      
       
                   <DataTable value={BookChapters} paginator showGridlines rows={10} loading={loading} dataKey="id">
                       <Column field="id" header="Book Chapter Id" style={{ minWidth: "12rem" }}/>
                       
                       <Column field="titleChapter" header="Book Chapter Title" style={{ minWidth: "12rem" }}/>
                       <Column header="Action" body={actionBodyTemplate} style={{ minWidth: "12rem", textAlign: "center" }}/>
                     
                   </DataTable>
                    {/*Popup thêm category */}
                    <Dialog header="Add Book Chapter" visible={Visible} style={{ width: "40vw" }} onHide={() => setVisible(false)} className="AddBookChapterlog">
                       <div>
                           <label>
       Tên tập:
                           </label>
                           <InputText value={titleChapter} onChange={(e) => setTitleChapter(e.target.value)} className="w-full mb-3" required />
                           
                           <Button label="Thêm" icon="pi pi-check" className="p-button-success" onClick={handleAddBookChapterSubmit} />
                       </div>
                    </Dialog>
       
                    <Dialog header="Get Book Chapter By Id" visible={visibleGetChapterById} style={{ width: "40vw" }} onHide={()=>setvisibleGetChapterById(false)} className="GetChapterbyIdlog">
                       <div>
                           <label>Nhập bookChapterId: </label>
                           <InputText value={bookChapterId} onChange={(e)=> setbookChapterId(e.target.value)} required/>
                           <Button label="tìm kiếm" icon="pi pi-check" onClick={handleGetBookChapterById} />
                           {/*Hiển thị kết quả nếu có */}
                           {chapterId && (
                               <div style={{ marginTop: "20px" }}>
                                   <p><strong>ID:</strong> {chapterId.id}</p>
                                   <p><strong>Title:</strong> {chapterId.titleChapter}</p>
                               </div>
                           )}
                       </div>
                    </Dialog>
       
                    <Dialog header="Update Book Chapter" visible={visibleUpdate} style={{ width: "40vw" }} onHide={()=>setVisibleUpdate(false)} className="UpdateChapterlog" >
                       <div>
                           <label>Nhập id: </label>
                           <InputText value={bookChapterId} onChange={(e)=> setbookChapterId(e.target.value)} className="" required />
                           <label>Cập nhật tên: </label>
                           <InputText value={titleChapter?.titleChapter || ''}  onChange={(e) => setTitleChapter({ ...titleChapter, titleChapter: e.target.value })}  required />
                           
                           <Button label="Cập nhật" icon="pi pi-check" className="" onClick={handleUpdateChapter}  />
                            {/*Hiển thị kết quả nếu có 
                            {updatebookcategory && (
                               <div style={{ marginTop: "20px" }}>
                                   <p><strong>ID:</strong> {updatebookcategory.id}</p>
                                   <p><strong>Name:</strong> {updatebookcategory.name}</p>
                               </div>
                           )} */}
                       </div>
                    </Dialog>
                    <Dialog header="Delete Book Category" visible={visibleDelete} style={{ width: "40vw" }} onHide={()=>setVisibleDelete(false)} className="UpdateChapterlog">
                       <div>
                       <label>Nhập id: </label>
                       <InputText value={bookChapterId} onChange={(e)=> setbookChapterId(e.target.value)} className="" required />
                       </div>
                       <div>
                       <Button label="Xóa" icon="pi pi-trash" className="" onClick={handleDeleteChapter}  />
                       </div>
                    </Dialog>
               </div>
    );
};

export default BookChapter;
