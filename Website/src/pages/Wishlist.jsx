import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
const URL = import.meta.env.VITE_APP_BACKEND_URL;

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="container mt-4">
      <AppHeader title="Wishlist" />

      {wishlistItems.length === 0 ? (
        <h5 className="text-center text-muted">💔 Your wishlist is empty</h5>
      ) : (
        <div className="row">
          {wishlistItems.map((item) => (
            <div className="col-md-6 col-lg-4 mb-4" key={item._id}>
              <div className="card h-100">
                <img
                  src={`${URL}/images/product-images/${item.image}`}
                  className="card-img-top"
                  alt={item.name}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text text-muted">Price: ₹{item.price}</p>
                  <div className="d-flex justify-content-between mt-auto">
                    <button
                      className="btn btn-success"
                      onClick={() => addToCart({ ...item, id: item._id })}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => removeFromWishlist(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
