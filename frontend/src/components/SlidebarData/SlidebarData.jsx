import React from "react";
import {
    CSidebar,
    CSidebarHeader,
    CSidebarBrand,
    CSidebarNav,
    CNavTitle,
    CNavItem,
    CNavGroup,
    CBadge,
    CSidebarToggler
} from '@coreui/react';

const SlidebarData = () => {

    return (
        <CSidebar className="border-end">
            <CSidebarNav>
                <CNavTitle>Quản lý dữ liệu</CNavTitle>
                <CNavItem href="#"> Địa điểm </CNavItem>
                <CNavItem href="#"> Người dùng </CNavItem>
                {/* <CNavGroup
                toggler={
                    <>
                        
                    </>
                }
                >
                <CNavItem href="#"><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Nav dropdown item</CNavItem>
                <CNavItem href="#"><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Nav dropdown item</CNavItem>
                </CNavGroup> */}
                <CNavItem href="#"> Bài đăng </CNavItem>
                <CNavItem href="https://coreui.io/pro/"> Thời tiết </CNavItem>
            </CSidebarNav>
            <CSidebarHeader className="border-top">
                <CSidebarToggler />
            </CSidebarHeader>
        </CSidebar>
    )
};

export { SlidebarData };