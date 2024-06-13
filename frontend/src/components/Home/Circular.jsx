
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { Tag } from 'primereact/tag';
// import { ProductService } from './service/ProductService';

export default function Circular() {
    const [products, setProducts] = useState([]);
    const responsiveOptions = [
        {
            breakpoint: '1400px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '1199px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '575px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    useEffect(() => {
        [
            { name: 'Blue Stripe Stoneware Plate', price: 42, image: 'product1.jpg', inventoryStatus: 'INSTOCK' },
            { name: 'Hand Painted Blue Flat Dish', price: 28, image: 'product2.jpg', inventoryStatus: 'LOWSTOCK' },
            { name: 'White Orchid Plant', price: 49, image: 'product3.jpg', inventoryStatus: 'OUTOFSTOCK' },
            { name: 'Star Sky Mug', price: 16, image: 'product4.jpg', inventoryStatus: 'INSTOCK' },
            { name: 'Terra Cotta Plant Pot', price: 24, image: 'product5.jpg', inventoryStatus: 'LOWSTOCK' },
            { name: 'Blue Stripe Stoneware Plate', price: 42, image: 'product1.jpg', inventoryStatus: 'INSTOCK' },
            { name: 'Hand Painted Blue Flat Dish', price: 28, image: 'product2.jpg', inventoryStatus: 'LOWSTOCK' },
            { name: 'White Orchid Plant', price: 49, image: 'product3.jpg', inventoryStatus: 'OUTOFSTOCK' },
            { name: 'Star Sky Mug', price: 16, image: 'product4.jpg', inventoryStatus: 'INSTOCK' },
            { name: 'Terra Cotta Plant Pot', price: 24, image: 'product5.jpg', inventoryStatus: 'LOWSTOCK' }
        ].map((product) => setProducts((prevProducts) => [...prevProducts, product]));
    }, []);

    const productTemplate = (product) => {
        return (
            <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
                <div className="mb-3">
                    <img src={`https://dltm-cdn.vnptit3.vn/resources/portal//Images/AGG/lhoangngoc222/tin/z5493130595368_ee0b21238db9265c09f82dbc3f409c4e_496169836.jpg`} alt={product.name} className="w-10 shadow-2" />
                </div>
                <div>
                    <h4 className="mb-1">{product.name}</h4>
                    <h6 className="mt-0 mb-3">${product.index}</h6>
                    {/* <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag> */}
                </div>
            </div>
        );
    };

    return (
        <div className="">
            <Carousel value={products} numVisible={4} numScroll={4} responsiveOptions={responsiveOptions} className="custom-carousel" circular
            autoplayInterval={2500} itemTemplate={productTemplate} />
        </div>
    )
}
        