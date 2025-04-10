import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="container py-3" id='header-section'>
      <div className="row align-items-center">

        {/* Left: Logo */}
        <div className="col-md-3 text-center">
          <img
            className="rounded-circle img-fluid"
            src="/images/logo.png"
            alt="Logo"
            style={{ height: '80px', width: 'auto' }}
          />
        </div>

        {/* Center: Navbar + Search */}
        <div className="col-md-6 d-flex justify-content-center">
          <nav className="navbar navbar-expand-lg p-0">
            <div className="container-fluid p-0">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#home-section">Home</a>
                  </li>
                  <li className="nav-item ms-3">
                    <a className="nav-link active" href="#category-section">Category</a>
                  </li>
                  <li className="nav-item ms-3">
                    <a className="nav-link active" href="#bestseller-section">Bestseller</a>
                  </li>
                  <li className="nav-item mx-3">
                    <a className="nav-link active" href="#footer-section">Contact</a>
                  </li>
                </ul>

                {/* Search Field with Icon */}
                <form className="d-flex align-items-center position-relative" role="search" style={{ minWidth: '250px' }}>
                  <input
                    className="form-control pe-5"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button
                    className="position-absolute end-0 top-50 translate-middle-y me-2 p-0 border-0 bg-transparent"
                    type="submit"
                  >
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                </form>
              </div>
            </div>
          </nav>
        </div>

        {/* Right: Icons */}
        <div className="col-md-3 d-flex justify-content-center align-items-center gap-5">
          <Link to="/cart"><i className="fa-solid fa-cart-shopping fa-xl"></i></Link>
          <Link to="/wishlist"><i className="fa-solid fa-heart fa-xl"></i></Link>
          <Link to="/profile"><i className="fa-solid fa-user fa-xl"></i></Link>
          
          
        </div>
      </div>
    </div>
  );
};

export default Header;
