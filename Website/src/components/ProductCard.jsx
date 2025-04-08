import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="card border-1 shadow rounded-4 p-3"  style={{minWidth: "300px", marginRight: "10px"}}>
      <div className="position-relative text-center">
        <span className="badge bg-success position-absolute top-0 start-0 m-2">-30%</span>
        <button className="btn btn-light rounded-circle position-absolute top-0 end-0 m-2">
          <i className="fa-regular fa-heart"></i>
        </button>
        <img
          src="https://picsum.photos/80/80"
          alt={product.name}
          className="img-fluid my-3"
          style={{ height: '150px', objectFit: 'contain' }}
        />
      </div>

      <div className="card-body text-center" >
        <h6 className="card-title fw-bold">{product.name}</h6>
        <p className="mb-1 text-muted small">
          1 UNIT <i className="fa-solid fa-star text-warning ms-1"></i> {product.rating}
        </p>
        <h5 className="fw-bold">${product.price.toFixed(2)}</h5>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <div className="btn-group" role="group">
            <button className="btn btn-outline-secondary px-2 py-1">
              <i className="fa-solid fa-minus"></i>
            </button>
            <button className="btn btn-light px-3 py-1" disabled>1</button>
            <button className="btn btn-outline-secondary px-2 py-1">
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
          <button className="btn btn-outline-dark ms-3">
            Add to Cart <i className="fa-solid fa-cart-shopping ms-1"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
