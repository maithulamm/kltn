
import React, { Fragment} from 'react';
import { MeterGroup } from 'primereact/metergroup';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
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
    const News = useSelector((state) => state.news?.news?.allNews);
    const navigate = useNavigate();

    const labelList = ({ values }) => (
        <div className="formgrid grid justify-content-between mt-3">
            {values.map((item, index) => (
                <div className={`field col-6 md:col-2 justify-content-between`} key={index}>
                    <Card className={`field col-${12} justify-content-between border-1 border-primary hover:bg-primary h-8rem`}>
                        <div className={`flex justify-content-between col-12 w-100`}>
                            <div className="flex-column">
                                <span className="text-secondary" style={{fontSize: device() ? '1.2rem' : '0.9rem'}}>{item.label}</span>
                                <br/>
                                <br/> 
                                <span className="font-bold text-4xl ml-2" style={{ backgroundColor: 'transparent' , color: item.color2 }}>{item.value}</span>
                            </div>
                            <div className="flex flex-column ">
                                <span className="justify-content-center align-items-center text-center m-1" style={{ backgroundColor: 'transparent' , color: item.color1 }}>
                                    <i className={item.icon} style={{
                                        fontSize: '1.5rem',
                                        color: item.color1
                                    }} />
                                </span>
                                {/* <br/> */}
                                <br/>
                                <Button onClick={() => navigate(item.ref)} icon={"pi pi-arrow-right"} text className='hover:bg-primary cursor-pointer ' style={{ color: device() ? '#ffffff' : 'var(--primary-color)' }}/>
                            </div>
                        </div>
                    </Card>
                </div>
            ))}

        </div>
    );


    const values = [
        { label: 'Du lịch', color1: '#34d399', color2: '#f87171', value: Place?.length, icon: 'pi pi-map-marker', ref: '/kltn/admin/data/place' },
        { label: `Loại`, color1: '#60a5fa', color2: '#c084fc', value: Type?.length, icon: 'pi pi-list', ref: '/kltn/admin/data/type'},
        { label:'Người dùng', color1: '#fbbf24', color2: '#60a5fa', value: User?.length-1, icon: 'pi pi-address-book', ref: '/kltn/admin/data/user'},
        { label: 'Tiện ích ', color1: '#c084fc', color2: '#34d399', value: Place2?.length, icon: 'pi pi-objects-column', ref: '/kltn/admin/data/place2'},
        { label: 'Bảng tin', color1: '#f87171', color2: '#fbbf24', value: News?.length, icon: 'pi pi-bookmark', ref: '/kltn/data/admin/news' },
    ]; 

 

    return (
        <Fragment>
            <MeterGroup values={values} labelList={labelList} className='col-12'/>
        </Fragment>
    )
}
        

export default Dashboard;
