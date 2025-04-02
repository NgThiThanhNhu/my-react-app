import { useState } from "react";
import { Authentication } from "../../apis";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const LoginPage = () => {
    const [userName, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const dieuhuong = useNavigate();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Authentication.login({username: userName, password: Password});
            console.log("Gửi request đăng nhập:", { username: userName, password: Password });

            console.log("API response:", response.data);

            if (response.data) {
                /*const { username, token } = response.data;
                alert(`Đăng nhập thành công: ${username}`);

                // Lưu token vào cookie
                Cookies.set("token", token, { expires: 1, secure: true, sameSite: "None" });

                // Kiểm tra lại token
                const tokenFromCookie = Cookies.get("token");
                console.log("Token lấy từ cookie:", tokenFromCookie);*/

                console.log("Navigating to /book-category", dieuhuong);
                dieuhuong("/book-chapter");
                setUsername('');
                setPassword('');
            } else {
                alert(`Lỗi đăng nhập: ${response.message}`);
            }
        } catch (error) {
            console.error("Lỗi đăng nhập:", error);
            console.log("Chi tiết lỗi:", error.response); 
            alert("Lỗi đăng nhập, vui lòng thử lại!");
        }
    };

    return (
        <div className="login-container">
            <h2>Đăng nhập</h2>
            <form onSubmit={handleLoginSubmit}>
                <div>
                    <label>Tên đăng nhập: </label>
                    <input type="text" value={userName} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Mật khẩu: </label>
                    <input type="password" value={Password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Button type="submit">Đăng nhập</Button>
            </form>
        </div>
    );
};

export default LoginPage;
