
import React, { useRef } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

export default function Toast_CPN({label, icon, severity, summary, detail}) {
    const toast = useRef(null);

    const show = () => {
        toast.current.show({ severity: severity, summary: summary, detail: detail });
    };

    return (
        <div className="card flex justify-content-center">
            <Toast ref={toast} />
            <Button onClick={show} label={label}
              icon={icon}
              className="p-button-success m-2 h-3rem" />
        </div>
    )
}
        