import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductsByCategory } from '../api/Product_API';
import ProductCard from '../components/ProductCard';

const ProductsPerCategory = () => {
  const { categoryId, categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductsByCategory(categoryId);
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchProducts();
  }, [categoryId]);

  return (
    <div className="container mt-4">
      <AppHeader title={categoryName} />
      <div className="row">
        {products.length === 0 ? (
          <h5 className="text-center text-muted mt-5">No products found in this category</h5>
        ) : (
          products.map((item) => (
            <div className="col-md-6 col-lg-4 mb-4" key={item._id}>
              <ProductCard item={item} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductsPerCategory;
