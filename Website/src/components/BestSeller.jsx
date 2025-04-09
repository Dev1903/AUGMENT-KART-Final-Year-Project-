import React, { useRef, useEffect } from 'react';
import items from '../assets/data';
import ProductCard from './ProductCard';

const BestSeller = () => {
    const scrollRef = useRef(null);

    const scroll = (dir) => {
        const scrollAmount = 200;
        scrollRef.current.scrollLeft += dir === 'left' ? -scrollAmount : scrollAmount;
    };

    useEffect(() => {
        const el = scrollRef.current;

        const wheelScroll = (e) => {
            if (e.deltaY === 0) return;
            e.preventDefault();
            el.scrollLeft += e.deltaY;
        };

        el.addEventListener('wheel', wheelScroll, { passive: false });
        return () => el.removeEventListener('wheel', wheelScroll);
    }, []);

    return (
        <div className="col" id='bestseller-section'>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h2>BestSeller</h2>
                    </div>
                    <div className="col-md-6 d-flex justify-content-end">
                        <div className="btn btn-outline-secondary me-2 pe-3 ps-3 d-flex justify-content-center align-items-center" onClick={() => scroll('left')}>
                            <i className="fa-solid fa-chevron-left"></i>
                        </div>
                        <div className="btn btn-outline-secondary ms-2 pe-3 ps-3 d-flex justify-content-center align-items-center" onClick={() => scroll('right')}>
                            <i className="fa-solid fa-chevron-right"></i>
                        </div>
                    </div>
                </div>

                <div className="row mt-3">
                    <div
                        className="d-flex overflow-auto flex-nowrap w-100 px-2 category-scrollbar-hide"
                        ref={scrollRef}
                        style={{
                            scrollBehavior: 'smooth',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                        }}
                    >
                        {items.slice(0, 10).map((item) => (
                            <ProductCard product={item} key={item.id} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BestSeller;
