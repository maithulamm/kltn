
import React, { Fragment, useEffect, useRef } from 'react';
import { MeterGroup } from 'primereact/metergroup';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import './style.css'
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();
    useEffect(() => {

    }, []);
    const labelList = ({ values }) => (
        <div className="flex flex-wrap justify-content-center gap-3">
            {values.map((item, index) => (
                <Card className={`border-round flex align-items-center justify-content-center w-${window.innerWidth < window.innerHeight ? '24rem' : 'auto'} h-8rem border-1 border-primary hover:bg-primary `} key={index}>
                    <div className={`flex justify-content-between w-12rem h-6rem`}>
                        <div className="flex flex-column">
                            <span className="text-secondary text-xl">{item.label}</span>
                            <br/>
                            <span className="font-bold text-3xl">{item.value}</span>
                        </div>
                        <div className="flex flex-column">
                            <span className="border-circle inline-flex justify-content-center align-items-center text-center" style={{ backgroundColor: item.color1, color: '#ffffff', width: '30px', height: '30px' }}>
                                <i className={item.icon} />
                            </span>
                            <br/>
                            <br/>
                            <a href='#'><i className='pi pi-arrow-right hover:bg-primary cursor-pointer ' style={{ color: '#ffffff' }}/></a>
                        </div>
                    </div>
                </Card>
            ))}

        </div>
    );


    const values = [
        { label: 'Địa điểm', color1: '#34d399', color2: '#fbbf24', value: 25, icon: 'pi pi-map-marker' },
        { label: 'Người dùng', color1: '#fbbf24', color2: '#60a5fa', value: 15, icon: 'pi pi-user' },
        { label: `Loại địa điểm`, color1: '#60a5fa', color2: '#c084fc', value: 20, icon: 'pi pi-list' },
        { label: 'System', color1: '#c084fc', color2: '#c084fc', value: 10, icon: 'pi pi-cog' }
    ];

 

    return (
        <Fragment>
            <div className="card flex justify-content-center my-4 w-12">
                <MeterGroup values={values}  labelList={labelList} />
            </div>
        </Fragment>
    )
}
        

export default Dashboard;
