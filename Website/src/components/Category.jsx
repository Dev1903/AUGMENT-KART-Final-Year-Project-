import React, { useRef, useEffect } from 'react';

const categories = [
    "Fruits", "Vegetables", "Dairy", "Snacks", "Drinks",
    "Non-Veg", "Spices", "Fruits", "Vegetables", "Dairy", "Snacks", "Drinks",
    "Non-Veg", "Spices", "Fruits", "Vegetables", "Dairy", "Snacks", "Drinks",
    "Non-Veg", "Spices"
];

const Category = () => {
    const scrollRef = useRef(null);

    const scroll = (dir) => {
        const scrollAmount = 200;
        scrollRef.current.scrollLeft += dir === 'left' ? -scrollAmount : scrollAmount;
    };

    useEffect(() => {
        const el = scrollRef.current;

        // ✅ ADDED: Convert mouse wheel scroll into horizontal scroll
        const wheelScroll = (e) => {
            if (e.deltaY === 0) return;
            e.preventDefault(); // important to override default vertical scroll
            el.scrollLeft += e.deltaY;
        };

        // ✅ ADDED: use passive: false to allow preventDefault()
        el.addEventListener('wheel', wheelScroll, { passive: false });

        return () => el.removeEventListener('wheel', wheelScroll);
    }, []);

    return (
        <div className="col">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h2>Categories</h2>
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
                        // ✅ CHANGED: added scroll ref + custom styles for horizontal scroll
                        className="d-flex overflow-auto flex-nowrap w-100 px-2 category-scrollbar-hide justify-content-center align-items-center"
                        ref={scrollRef}
                        style={{
                            scrollBehavior: 'smooth',
                            scrollbarWidth: 'none', // Firefox scrollbar hide
                            msOverflowStyle: 'none', // IE scrollbar hide
                        }}
                    >
                        {categories.map((cat, idx) => (
                            <div
                                key={idx}
                                className="badge bg-light text-dark fs-6 me-3 py-2 px-3 rounded-pill flex-shrink-0"
                                role="button"
                            >
                                {cat}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Category;
