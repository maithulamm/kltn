import React, { Fragment, useEffect, useRef, useState } from 'react';
import logo from '../../assets/images/logo.png';
import avt from '../../assets/images/avatar.svg';
import './style.css';
import { Link } from 'react-router-dom/dist';
import { useSelector } from 'react-redux';
import { logOut } from '../../redux/apiRequest';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Modal from 'react-modal';
// import { Container, Navbar, Image, DropdownButton, Dropdown, CardTitle, NavDropdown, Nav, NavItem, NavLink } from 'react-bootstrap';
import { Button } from 'primereact/button';
import Modals from '../Modals/Modal';
import { Menubar } from 'primereact/menubar';
import { MegaMenu } from 'primereact/megamenu';
import { Menu } from 'primereact/menu';
import { Toast } from 'primereact/toast';
import { SplitButton } from 'primereact/splitbutton';
import { Image } from 'primereact/image';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';


const rl = [
  ["/admin/register", "Đăng ký"],
  ["/admin/login", "Đăng nhập"],
];

export const Header = () => {

  const user = useSelector((state) => state.auth.login.currentUser);
  // const [selectedIcon, setSelectedIcon] = useState(rl[selected_Item]);

  const accessToken = user?.accessToken;
  // localStorage.setItem('access_Token', accessToken);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const toast = useRef(null);

  const handleLogout = () => {
    logOut(dispatch, navigate, accessToken, user.id);

  }

  const confirm1 = () => {
    confirmDialog({
        message: `Bạn có muốn đăng xuất khỏi tài khoản ${user.username}?`,
        header: 'Xác nhận đăng xuất',
        icon: 'pi pi-info-circle',
        defaultFocus: 'reject',
        acceptClassName: 'p-button-danger',
        position: 'top',
        accept: () => handleLogout(),

    });
};

  useEffect(() => {
    // document.getElementsByClassName
  }, []);
    return (
        // <section className="Header">
        //   <div className='Logo-name'>
        //     <div className='Logo'>
        //       <img src={logo} className="App-logo" alt="logo" />
        //     </div>
        //     <div className='Name'>
        //     <h1>HỆ THỐNG QUẢN LÝ ĐỊA ĐIỂM DU LỊCH AN GIANG</h1>
        //     </div>
        //   </div>
        //   <div className='Username-avt RL'>

        //         <div className='Username'>
        //           <h6>Xin chào, {user.username}!</h6>
        //         </div>
        //         <div className='Avt'>
        //           <img src={avt} className="Avt-img" alt="logo" />
        //         </div>
        //         <div className="LO__icon" >
        //         {/*  */}
        //             {/* <input id='logout' type="checkbox" name="logout" style={{display:"none"}}/> */}
        //             <div className="LO__label" onClick={() => handleLogout()}>
        //               <h2 className='hh2 delete button'>Đăng xuất</h2>
        //             </div>
        //             {/* <div className="LO__quest" style={{display:""}}>
        //               abc
        //             </div> */}
        //         </div>
        //   </div>
        // </section>
        <Fragment>
          <Menubar 
            start={
              <img alt="logo" src={logo} height="40" className="mr-2"></img>
            }
            model={
              [
                { label: 'Trang chủ', icon: 'pi pi-fw pi-home', url: '/admin/home', style: {backgroundColor: 'red'}},
                { label: 'Dữ liệu', icon: 'pi pi-fw pi-database', items: [
                  { label: 'Địa điểm', icon: 'pi pi-fw pi-map-marker', url: '/admin/data/places' },
                  { label: 'Người dùng', icon: 'pi pi-fw pi-address-book', url: '/admin/places' },
                  { label: 'Loại địa điểm', icon: 'pi pi-fw pi-list', url: '/admin/types' },
                  ],
                  
                },
                { label: 'Bản đồ', icon: 'pi pi-fw pi-map', url: '/admin/map' },
                { label: 'Phản hồi', icon: 'pi pi-fw pi-comments', url: '/admin/users' },
                { label: 'Liên kết', icon: 'pi pi-fw pi-link', url: '/admin/users' },
                { label: 'Báo cáo', icon: 'pi pi-fw pi-chart-bar', url: '/admin/reports' },
                { label: 'Hướng dẫn', icon: 'pi pi-fw pi-question-circle', url: '/admin/guide' },
              ]
            }
            end={
              <Fragment>
                <SplitButton label={
                  <Fragment>
                    Xin chào, {user.username}!
                    <Image className='mx-2' src={avt} width={40} />
                  </Fragment>
                } 
                //  onClick={save} 
                 model={
                  [
                    { label: 'Thông tin cá nhân', icon: 'pi pi-user' },
                    { label: 'Đổi mật khẩu', icon: 'pi pi-key' },
                    { label: 'Đăng xuất', icon: 'pi pi-sign-out', command: () => confirm1() }
                  ]
                }
                text
                />
                
              </Fragment>
              }
            menuIcon = 'pi pi-bars'
            

            />
            <ConfirmDialog />
        </Fragment>
    );

}
