import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-dark text-white pt-5 pb-4" id='footer-section'>
            <div className="container text-md-left">
                <div className="row text-md-left">

                    {/* About Section */}
                    
                    <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                                                 
                            <img
                                className="rounded-circle img-fluid"
                                src="/images/logo.png"
                                alt="Logo"
                                style={{ height: '80px', width: 'auto' }}
                            />
                            
                            

                        <p>
                            Your one-stop shop for fresh groceries and amazing AR experience. Enjoy quality products, fast delivery, and great service!
                        </p>
                    </div>

                    {/* Links Section */}
                    <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                        <h5 className="text-uppercase mb-4 font-weight-bold">Quick Links</h5>
                        <p><a href="#home-section" className="text-white text-decoration-none">Home</a></p>
                        <p><a href="#category-section" className="text-white text-decoration-none">Category</a></p>
                        <p><a href="#bestseller-section" className="text-white text-decoration-none">Bestseller</a></p>
                    </div>

                    {/* Contact Section */}
                    <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                        <h5 className="text-uppercase mb-4 font-weight-bold">Contact</h5>
                        <p><i className="fas fa-home me-3"></i> Kolkata, India</p>
                        <p><i className="fas fa-envelope me-3"></i> support@freshmart.com</p>
                        <p><i className="fas fa-phone me-3"></i> +91 9876543210</p>
                    </div>

                    {/* Social Icons */}
                    <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mt-3 text-center">
                        <h5 className="text-uppercase mb-4 font-weight-bold">Follow Us</h5>
                        <a href="#" className="text-white me-4 fs-5"><i className="fab fa-facebook"></i></a>
                        <a href="#" className="text-white me-4 fs-5"><i className="fab fa-twitter"></i></a>
                        <a href="#" className="text-white me-4 fs-5"><i className="fab fa-instagram"></i></a>
                        <a href="#" className="text-white fs-5"><i className="fab fa-linkedin"></i></a>
                    </div>
                </div>

                <hr className="my-3" />

                {/* Copyright */}
                <div className="row align-items-center">
                    <div className="col-md-12 text-center">
                        <p className="mb-0">© {new Date().getFullYear()} AugmentCart. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
