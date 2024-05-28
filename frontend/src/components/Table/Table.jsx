
import React, { useState, useEffect } from 'react';
import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Tag } from 'primereact/tag';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { useSelector } from 'react-redux';
import { BreadCrumb } from 'primereact/breadcrumb';

import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './style.css';
import { Link } from 'react-router-dom';
import { Row } from 'primereact/row';



function DynamicColumnsDemo() {
    const Data = useSelector((state) => state.places?.places?.allPlaces);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        intro: { value: null, matchMode: FilterMatchMode.CONTAINS },
        price: { value: null, matchMode: FilterMatchMode.GTE },
        type: { value: null, matchMode: FilterMatchMode.EQUALS },
        phone: { value: null, matchMode: FilterMatchMode.EQUALS },
        during: { value: null, matchMode: FilterMatchMode.EQUALS },
    });
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-center m-2" style={{ width: 'auto'}}>
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={(e) => onGlobalFilterChange(e)} placeholder="Nhập từ khóa" />
                </IconField>
            </div>
        );
    };
    const header = renderHeader();
    const [selectedProducts, setSelectedProducts] = useState(null);

    const columns = [
        // {field: 'code', header: 'Code'},
        {field: 'intro', header: 'Tên'},
        {field: 'type', header: 'Loại'},
        {field: 'phone', header: 'SĐT'},
        {field: 'during', header: 'Thời gian'},
        {field: 'open', header: 'Mở cửa'},
        {field: 'close', header: 'Đóng cửa'},
        {field: 'email', header: 'Email'},
        {field: 'address', header: 'Địa chỉ'},
        {field: 'info', header: 'Thông tin'},
        {field: 'lat', header: 'Vĩ độ'},
        {field: 'long', header: 'Kinh độ'},

        
    ];
    const items = [
        { label: 'Dữ liệu' },
        {
            label: 'Địa điểm',
            template: () => <Link href="/">Địa điểm</Link>
        }
    ];
    const home = { icon: 'pi pi-home', url: '../' };

    useEffect(() => {
        setProducts(Data.map((D) => {
            return {
                _id: D._id,
                intro: D.intro,
                type: D.type,
                phone: D.phone ? D.phone : 'Đang cập nhật',
                during: D.during,
                open: D.open,
                close: D.close,
                email: D.email === 'unknow@gmail.com' ? 'Đang cập nhật' : D.email,
                address: D.address,
                info: D.info,
                lat: D.lat.slice(0, 6),
                long: D.long.slice(0, 6),
            };
        })) ;
        setLoading(false);
        // console.log(selectedProducts?.map((e) => e._id));
        console.log(Data);
    }, [Data, selectedProducts]);

    return (
        <div className="card ">
            <div className="" style={{display: 'flex', justifyContent: 'space-between'}}>
                <BreadCrumb model={items} home={home} style={{width: 'auto', border: 'none', padding: '0.5rem 0 0 0'}}/>
                {renderHeader()}
            </div>
            <DataTable value={products} removableSort paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '120vw'}}
                dataKey="_id" filters={filters} filterDisplay="row" loading={loading} globalFilterFields={['intro', 'type', 'phone', 'during', 'open', 'close', 'email', 'address', 'info', 'lat', 'long']}
                 className="p-datatable-customers" selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)} selectionMode="checkbox"
                scrollable showGridlines resizableColumns columnResizeMode="expand" reorderableColumns rowHover scrollHeight='75vh'
              >
                <Column selectionMode="multiple" headerStyle={{ width: '2rem' }}></Column>
                <Column alignHeader={'center'} align={'left'} field="intro" header="Tên" sortable style={{ minWidth: '10rem' }} filterPlaceholder="Tìm tên" filter />
                <Column alignHeader={'center'} align={'center'} field="type" header="Loại" sortable style={{ minWidth: '10rem' }}/>
                <Column alignHeader={'center'} align={'center'} field="phone" header="Số điện thoại" sortable style={{ minWidth: '12rem' }} filterPlaceholder="Tìm SĐT" filter/>
                {/* <Column field="during" header="Thời gian" sortable style={{ minWidth: '10rem' }}/> */}
                <Column alignHeader={'center'} align={'center'} field="open" header="Mở cửa" sortable style={{ minWidth: '10rem' }}/>
                <Column alignHeader={'center'} align={'center'} field="close" header="Đóng cửa" sortable style={{ minWidth: '10rem' }}/>
                <Column alignHeader={'center'} align={'center'} field="email" header="Email" sortable style={{ minWidth: '10rem' }}/>
                <Column alignHeader={'center'} align={'left'} field="address" header="Địa chỉ" sortable style={{ maxWidth: '20rem' }}/>
                <Column alignHeader={'center'} align={'left'} field="info" header="Thông tin" style={{ maxWidth: '20rem'}} />
                <Column alignHeader={'center'} align={'center'} field="lat" header="Vĩ độ" style={{ minWidth: '5rem' }}/>
                <Column alignHeader={'center'} align={'center'} field="long" header="Kinh độ" style={{ minWidth: '5rem' }}/>
                
            </DataTable>
        </div>
    );
}
        
export {DynamicColumnsDemo as Table};