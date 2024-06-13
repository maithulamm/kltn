import React from "react";


export const fintIDType = (id) => {
    const Type = useSelector((state) => state.typePlaces?.typePlaces?.allTypePlaces);
    return (
        <>
            {Type?.map((item, index) => {
                if (item._id === id) {
                    return [item.name, item.color];
                }
            })}
        </>
    )
};