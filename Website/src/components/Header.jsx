import React from 'react'

const Header = () => {
    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-3 left">
                    <h1>Logo</h1>   
                </div>
                <div className="col-md-6 middle">
                <nav class="navbar navbar-expand-lg">
                    <div class="container-fluid">
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item ms-3">
                                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                                </li>
                                <li class="nav-item ms-3">
                                    <a class="nav-link" href="#">Link</a>
                                </li>
                                <li class="nav-item ms-3">
                                    <a class="nav-link" href="#">Link1</a>
                                </li>
                                <li class="nav-item ms-3">
                                    <a class="nav-link disabled">Disabled</a>
                                </li>
                            </ul>
                            <form class="d-flex" role="search">
                                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" style={{minWidth: "300px"}} />
                                <button class="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                </nav>
                </div>
                <div className="col-md-3 right d-flex justify-content-center align-items-center">
                    <div className="row ">
                    <div className="col-md-4 ps-5 pe-4">
                    <i class="fa-solid fa-cart-shopping fa-xl"></i>
                    </div>
                    <div className="col-md-4 ps-5 pe-4">
                    <i class="fa-solid fa-heart fa-xl"></i>
                    </div>
                    <div className="col-md-4 ps-5 pe-4 ">
                    <i class="fa-solid fa-user fa-xl"></i>
                    </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Header
