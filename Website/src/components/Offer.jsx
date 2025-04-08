import React from 'react'


const Offer = () => {
    return (
        <div className="col"  id='home-section'>
            <div className="container">
            <div className="row">
                {/* Left side */}
                <div className="col-md-8 d-flex align-items-center justify-content-center">
                    <div className="top-left d-flex align-items-center justify-content-between p-4">
                        <div>
                            <p className="text-warning fw-bold">100% Natural</p>
                            <h2 className="fw-bold">Fresh Vegetables</h2>
                            <p>Best Selling Summer Naturally Grown Vegetables.</p>
                            <button className="btn btn-outline-dark mt-2">SHOP NOW</button>
                        </div>
                        <img src="/public/images/top_left.png" alt="Juice" className="img-fluid top-left-img" />
                    </div>
                </div>

                {/* Right side */}
                <div className="col-md-4 d-flex flex-column justify-content-between">
                    <div className="top-right p-3 mb-3 d-flex align-items-center justify-content-between">
                        <div>
                            <p className="text-muted small">20% Off</p>
                            <h5 className="fw-bold">Fruits</h5>
                            <p className="text-primary small">Shop The Category →</p>
                        </div>
                        <img src="/images/top-right.png" alt="Fruits" className="img-fluid right" />
                    </div>
                    <div className="bottom-right p-3 d-flex align-items-center justify-content-between">
                        <div>
                            <p className="text-muted small">15% Off</p>
                            <h5 className="fw-bold">Snacks</h5>
                            <p className="text-primary small">Shop The Category →</p>
                        </div>
                        <img src="/images/bottom-right.png" alt="Breads" className="img-fluid right" />
                    </div>
                </div>
            </div>
        </div>
        </div>



    )
}

export default Offer
