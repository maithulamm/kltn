
import React, { useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import { ChevronDownIcon } from 'primereact/icons/chevrondown';
import { ChevronRightIcon } from 'primereact/icons/chevronright';
import { avtData } from "../../data/avtData";

const DropAVT = ({returnAvtID, state}) => {
    
    const [selectedCountry, setSelectedCountry] = useState(avtData[Number(state)] || avtData[3]);
    // console.log(state);
    const countries = avtData;

    const handleChange = (e) => {
        setSelectedCountry(e.value);
        returnAvtID(e.value.id.toString()); // Gọi callback prop với ID của mục đã chọn
    };

    const selectedCountryTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <img alt={option.name} src={option.path} className={`mr-2 flag`} style={{objectFit: 'contain', width: '20px' }} />
                    <div>{option.name}</div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const countryOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <img alt={option.name} src={option.path} className={`mr-2 flag`} style={{ objectFit: 'contain', width: '20px' }} />
                <div>{option.name}</div>
            </div>
        );
    };

    // const panelFooterTemplate = () => {
    //     return (
    //         <div className="py-2 px-3">
    //             {selectedCountry ? (
    //                 <span>
    //                     <b>{selectedCountry.name}</b> selected.
    //                 </span>
    //             ) : (
    //                 'No country selected.'
    //             )}
    //         </div>
    //     );
    // };

    return (
        <Dropdown value={selectedCountry} onChange={handleChange} options={countries} optionLabel="name" placeholder="Chọn ảnh đại diện" 
            valueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate} className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" 
            // panelFooterTemplate={panelFooterTemplate} 
            dropdownIcon={(opts) => {
                return opts.iconProps['data-pr-overlay-visible'] ? <ChevronRightIcon {...opts.iconProps} /> : <ChevronDownIcon {...opts.iconProps} />;
            }}/> 
    )
}
export default DropAVT;