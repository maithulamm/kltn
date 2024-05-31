import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import Trangchu from '../../assets/images/Trangchu.svg';
import Bando from '../../assets/images/Bando.svg';
import Dulieu from '../../assets/images/Dulieu.svg';
import Phanhoi from '../../assets/images/Phanhoi.svg';
import Lienket from '../../assets/images/Lienket.svg';
import Huongdan from '../../assets/images/Huongdan.svg';
import { Card, CardTitle, Col, Image, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

// import 'primereact/resources/primereact.min.css';
// import '@coreui/coreui/dist/css/coreui.min.css'
// import 'bootstrap/dist/css/bootstrap.min.css'


import { CBadge, CButton, CCard, CCardBody, CCollapse, CDropdown, CDropdownDivider, CDropdownItem, CDropdownMenu, CDropdownToggle, CNavGroup, CNavGroupItems, CNavItem, CNavLink, CNavTitle, CSidebarNav } from '@coreui/react'
import logo from '../../assets/images/logo.png';
// import 'bootstrap-icons/font/bootstrap-icons.css';





const navbar_icon = [
  // [Trangchu, 'Trang chủ', '/admin/home', 'house'],
  [Bando, 'Bản đồ', '/admin/map', 'map'],
  [Dulieu, 'Dữ liệu', '/admin/data', 'database'],
  [Phanhoi, 'Phản hồi', '/admin/feedback', 'comments'],
  [Lienket, 'Liên kết', '/admin/link', 'link'],
  [Huongdan, 'Hướng dẫn', '/admin/guide', 'book'],
];

const ANavbar = ({ show, handleClose, current }) => {
  // const [selectedIcon, setSelectedIcon] = useState(navbar_icon[selected_Item]);
  const [visible, setVisible] = useState(localStorage?.getItem('nav_vis') == 'true' ? true : false);

  useEffect(() => {
    localStorage.setItem('nav_vis', visible)
  }, [visible]);

  return (
    <Fragment>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch
      </Button> */}

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Image className='m-2' src={logo} width={50} />
          <Offcanvas.Title className='text-center ms-2'>
            Admin Dashboard
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <CSidebarNav>
            <CNavLink href={current == 0 ? "#" : '/admin/home'} style={{backgroundColor: `${current == 0 ? '#e3e4e6' : "#"}`, cursor: `${current == 0 ? 'default' : 'pointer'}`}}>
              <Col lg="4"><i className={`fa-solid fa-${'house'} fa-2xl mx-2`} style={{color: "#3b71ca"}}></i></Col>
              <Col className='my-3'>
                <CardTitle>
                {current == 0 ? <strong>{'Trang chủ'}</strong> : 'Trang chủ'}
                </CardTitle>
              </Col>
            </CNavLink>
            
            <CDropdownDivider className='my-3' style={{borderColor: "#3b71ca"}}/>

            <Row  className='py-3' onClick={() => setVisible(!visible)} style={{cursor: 'pointer', backgroundColor: 'initial', transition: 'background-color 0.3s', borderRadius: '10px'}}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#e3e4e6'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'initial'}
            >
              <Col lg="4" className='mt-3'><i className={`fa-solid fa-${'database'} fa-2xl ms-4`} style={{color: "#3b71ca"}}></i></Col>
              <Col className='my-3'>
                <CardTitle>
                  Dữ liệu
                </CardTitle>
              </Col>
              <Col lg="5" className='mt-3'><i className={`fa-solid fa-${!visible ? 'chevron-down' : 'chevron-up'} fa-xl ms-4`} style={{color: "#3b71ca"}}></i></Col>
              
            </Row>

            <CCollapse visible={visible}>
                <CNavGroupItems>
                  <CNavItem>
                    <CNavLink href="/admin/data/place">Địa điểm</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink href="/admin/data/user">Người dùng</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink href="/admin/data/category">Loại địa điểm</CNavLink>
                  </CNavItem>
                </CNavGroupItems>
            </CCollapse>

            <CDropdownDivider className='my-3' style={{borderColor: "#3b71ca"}}/>

            {navbar_icon.map((icon, index) => (
              <Fragment key={index}>
                {icon[1] == 'Dữ liệu' ? 
                  null
                : 
                  <CNavLink key={index} href={current == (index+1) ? "#" : icon[2]} style={{backgroundColor: `${current == (index+1) ? '#e3e4e6' : "#"}`, cursor: `${current == (index+1) ? 'default' : 'pointer'}`}}>
                    <Col lg="4"><i className={`fa-solid fa-${icon[3]} fa-2xl mx-2`} style={{color: "#3b71ca"}}></i></Col>
                    <Col className='my-3'>
                      <CardTitle>
                      {current == (index+1) ? <strong>{icon[1]}</strong> : icon[1]}
                      </CardTitle>
                    </Col>
                  </CNavLink>
                }
              </Fragment>
            ))}

          </CSidebarNav>
        </Offcanvas.Body>
      </Offcanvas>

    </Fragment>

  );
}

export {ANavbar as Navbar};

