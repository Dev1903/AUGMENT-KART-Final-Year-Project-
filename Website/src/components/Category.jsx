import React, { useRef, useEffect } from 'react';

const categories = [
    "Fruits", "Vegetables", "Dairy", "Snacks", "Drinks",
    "Non-Veg", "Spices",
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
        <div className="col" id='category-section'>
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
                        className="d-flex justify-content-center overflow-auto flex-nowrap w-100 px-2 category-scrollbar-hide"
                        ref={scrollRef}
                        style={{
                            scrollBehavior: 'smooth',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                        }}
                    >
                        {categories.map((cat, idx) => (
                            <div
                                key={idx}
                                className="text-center mx-3 flex-shrink-0"
                                style={{ width: '100px' }}
                            >
                                <img
                                    src="https://picsum.photos/80/80"
                                    alt={cat}
                                    className="rounded-circle mb-2"
                                    style={{
                                        width: '80px',
                                        height: '80px',
                                        objectFit: 'cover',
                                        border: '2px solid #eee',
                                    }}
                                />
                                <div className="fw-medium">{cat}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Category;
