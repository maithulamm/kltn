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
// import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';


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
const page =               
  [
    { label: 'Trang chủ', icon: 'pi pi-fw pi-home', url: '/admin/home'},
    { label: 'Dữ liệu', icon: 'pi pi-fw pi-database', items: [
      { label: 'Địa điểm', icon: 'pi pi-fw pi-map-marker', url: '/admin/data/place' },
      { label: 'Người dùng', icon: 'pi pi-fw pi-address-book', url: '/admin/data/user' },
      { label: 'Loại địa điểm', icon: 'pi pi-fw pi-list', url: '/admin/types' },
      ],
      
    },
    { label: 'Bản đồ', icon: 'pi pi-fw pi-map', url: '/admin/map' },
    { label: 'Phản hồi', icon: 'pi pi-fw pi-comments', url: '/admin/users' },
    { label: 'Liên kết', icon: 'pi pi-fw pi-link', url: '/admin/users' },
    { label: 'Báo cáo', icon: 'pi pi-fw pi-chart-bar', url: '/admin/reports' },
    { label: 'Hướng dẫn', icon: 'pi pi-fw pi-question-circle', url: '/admin/guide' },
  ]

  useEffect(() => {
   
   // Lấy đường dẫn tới file CSS từ node_modules
    const cssPath = require('primereact/resources/themes/bootstrap4-light-blue/theme.css');

    // Tạo một thẻ link để thêm CSS từ PrimeReact
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = cssPath;

    // Thêm thẻ link vào phần tử <head> của trang
    document.head.appendChild(linkElement);
    const style = document.createElement('style');

    const hrefPage = window.location.pathname.split('/');
    
    style.innerHTML = `
        li[data-id="pr_id_4_${hrefPage[2] === 'home' 
          ? '0' 
          : hrefPage[2] === 'data' ? '1' 
          : hrefPage[2] === 'map' ? '2'
          : hrefPage[2] === 'feedback' ? '3'
          : hrefPage[2] === 'link' ? '4'
          : hrefPage[2] === 'reports' ? '5'
          : '6'
        }"] {
            font-weight: 900;
            border-radius: 10px;
        }
        
    `;
    document.head.appendChild(style);
    return () => {
        document.head.removeChild(style);
    };

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
        <section id="HEADER">
          <Menubar 
            start={
              <Link to='/admin/home'> <img alt="logo" src={logo} height="40" className="mr-2"></img> </Link>
            }
            model={
              page
            }
            end={
              <Fragment>
                <SplitButton label={
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    Xin chào, {user.username}!
                    <Image className='' src={avt} width={40} style={{marginLeft: '1rem'}}/>
                  </div>
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
        </section>
    );

}
