
import React, { Fragment, useEffect, useRef } from 'react';
import { MeterGroup } from 'primereact/metergroup';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
// import 'primereact/resources/themes/bootstrap4-light-blue/theme.css'
// import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import './style.css'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
export const device = () => {
    if (window.innerWidth > window.innerHeight) {
        return true;
    } else {
        return false;
    }
}
function Dashboard() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const Place = useSelector((state) => state.places?.places?.allPlaces);
    const Place2 = useSelector((state) => state.places2?.places2?.allPlaces2);
    const User = useSelector((state) => state.users?.users?.allUsers);
    const Type = useSelector((state) => state.typePlaces?.typePlaces?.allTypePlaces);
    const navigate = useNavigate();

    const labelList = ({ values }) => (
        <div className="formgrid grid justify-content-around mt-3">
            {values.map((item, index) => (
                <div className={`field col-6 md:col-3 justify-content-around`} key={index}>
                    <Card className={`field col-${12} justify-content-around border-1 border-primary hover:bg-primary h-8rem`}>
                        <div className={`flex justify-content-around col-12 w-100`}>
                            <div className="flex-column">
                                <span className="text-secondary text-xl">{item.label}</span>
                                <br/>
                                <br/>
                                <span className="font-bold text-5xl" style={{ backgroundColor: 'transparent' , color: item.color2 }}>{item.value}</span>
                            </div>
                            <div className="flex-column">
                                <span className="justify-content-center align-items-center text-center m-1" style={{ backgroundColor: 'transparent' , color: item.color1 }}>
                                    <i className={item.icon} style={{
                                        fontSize: '1.5rem',
                                        color: item.color1
                                    }} />
                                </span>
                                <br/>
                                <br/>
                                <a href={item.ref}><i className='pi pi-arrow-right hover:bg-primary cursor-pointer ' style={{ color: '#ffffff' }}/></a>
                            </div>
                        </div>
                    </Card>
                </div>
            ))}

        </div>
    );


    const values = [
        { label: 'Du lịch', color1: '#34d399', color2: '#fbbf24', value: Place?.length, icon: 'pi pi-map-marker', ref: '/admin/data/place' },
        { label: `Loại`, color1: '#60a5fa', color2: '#c084fc', value: Type?.length, icon: 'pi pi-list', ref: '/admin/data/type'},
        { label: 'Người dùng', color1: '#fbbf24', color2: '#60a5fa', value: User?.length-1, icon: 'pi pi-address-book', ref: '/admin/data/user'},
        { label: 'Tiện ích ', color1: '#c084fc', color2: '#34d399', value: Place2?.length, icon: 'pi pi-objects-column', ref: '/admin/data/place2'},
    ];

 

    return (
        <Fragment>
            <MeterGroup values={values} labelList={labelList} className='col-12'/>
        </Fragment>
    )
}
        

export default Dashboard;
