import React from "react";
// import './style.css';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../redux/apiRequest";





const AdminHome = ({ width, height, top, left, position, height1 }) => {
    const userList = useSelector((state) => state.users.users?.allUsers);
    const user = useSelector((state) => state.auth.login.currentUser);
    return (
        <section className="admin" style={{ width: width, height: height, top: top, left: left, position: position}}>
            <div className="admin__title">
                <h2>Danh sách quản trị viên</h2>
            </div>
            <div className="admin__content" >
                <table id="admin__table" style={{ height: height1}}>
                    <tr className="main_row">
                        <th className="STT">STT</th>
                        <th>Tên đăng nhập</th>
                        <th>Email</th>
                        <th>Quyền truy cập</th>
                    </tr>
                    {userList?.map((u, index) => (
                        <tr className="child_row">
                            {
                                (user?.username === u?.username ? (
                                    <>
                                        <td className="STT">{index+1}</td>
                                        <td style={{color:"blue"}}>{u?.username}</td>
                                        <td style={{color:"blue"}}>{u?.email}</td>
                                        <td style={{color:"blue"}}>{u?.isAdmin===false ? "Chỉ xem" : "Chỉnh sửa"}</td>

                                    </>
                                ) : (
                                    <>
                                        <td className="STT">{index+1}</td>
                                        <td>{u?.username}</td>
                                        <td>{u?.email}</td>
                                        <td>{u?.isAdmin===false ? "Chỉ xem" : "Chỉnh sửa"}</td>
                                    </>
                                ))
                            }
                        </tr>
                    ))}
                </table>
            </div>
        </section>
    );
};

const Admin = ({ width, height, top, left, position }) => {
    const userList = useSelector((state) => state.users.users?.allUsers);
    const user = useSelector((state) => state.auth.login.currentUser);
    const accessToken = user?.accessToken;
    const dispatch = useDispatch();


    const handleDelete = (id, name) => {
        if (window.confirm(`Xóa tài khoản ${name}?`)) {
            deleteUser(id, accessToken, dispatch);
            alert("Xóa thành công!");
            window.location.reload();
        } 
        
    };

    return (
        <div className="admin wrap-collabsible" style={{ width: width, height: height, top: top, left: left, position: position}}>
            <input id="collapsible" class="toggle" type="checkbox" /> 
            {/* <div className="admin__title"> */}
                <label for="collapsible" class="admin__title">Danh sách quản trị viên</label>
            {/* </div> */}
            <div className="admin__content collapsible-content" >
                <div className="content-inner">
                    <table id="admin__table" style={{ height: "auto"}}>
                        <tr className="main_row">
                            <th className="STT">STT</th>
                            <th>Tên đăng nhập</th>
                            <th>Email</th>
                            <th>Quyền truy cập</th>
                            <th>Thao tác xóa</th>
                        </tr>
                        {userList?.map((u, index) => (
                            <tr className="child_row">
                                {
                                    (user?.username === u?.username ? (
                                        <>
                                            <td className="STT">{index+1}</td>
                                            <td style={{color:"blue"}}>{u?.username}</td>
                                            <td style={{color:"blue"}}>{u?.email}</td>
                                            <td style={{color:"blue"}}>{u?.isAdmin===false ? "Chỉ xem" : "Chỉnh sửa"}</td>
                                            <td style={{color:"blue"}}>Không thể xóa chính bạn</td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="STT">{index+1}</td>
                                            <td>{u?.username}</td>
                                            <td>{u?.email}</td>
                                            <td>{u?.isAdmin===false ? "Chỉ xem" : "Chỉnh sửa"}</td>
                                            {(user?.isAdmin === false)? (
                                                    <td>Không thể xóa người này</td>
                                                    ) : (
                                                    <td onClick={() => handleDelete(u._id, u?.username)} className="del">Xóa</td>
                                            )}
                                        </>
                                    ))
                                }
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    );
};

export {AdminHome, Admin};