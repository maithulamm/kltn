import React from "react";
import './style.css';
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { deleteUser } from "../../redux/apiRequest";
import { place } from '../../assets/data/place'





const Place = ({ width, height, top, left, position }) => {
    

    return (
        <div className="place wrap-collabsible-p" style={{ width: width, height: height, top: top, left: left, position: position}}>
            <input id="collapsible-p" class="toggle" type="checkbox" /> 
            {/* <div className="place__title"> */}
            <label for="collapsible-p" class="place__title">Danh sách địa điểm du lịch</label>
            {/* </div> */}
            <div className="place__content collapsible-content-p" >
                <div className="content-inner-p">
                    <table id="place__table" style={{ height: "35vh"}}>
                        <tr className="main_row">
                            <th className="STT">STT</th>
                            <th>Tên địa điểm</th>
                            <th>Địa chỉ</th>
                            <th>Liên hệ</th>
                            <th>Loại hình</th>
                            {/* <th>Vĩ độ</th>
                            <th>Kinh độ</th> */}
                        </tr>
                        {place?.map((p, index) => (
                            <tr className="child_row">
                                <td className="STT"> {index+1} </td>
                                <td > {p.name} </td>
                                <td > {p.address} </td>
                                <td > {p.contact} </td>
                                <td > {p.tag} </td>
                                {/* <td > {p.vido} </td>
                                <td > {p.kinhdo} </td> */}
                                {/* <td style={{color:"blue"}}>Không thể xóa chính bạn</td> */}

                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    );
};

export {Place};