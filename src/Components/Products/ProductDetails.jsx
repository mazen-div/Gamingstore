// ProductDetails.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductDet.css"; // Import your CSS file for styling

const ProductDetails = () => {
  const { categoryId, productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://gaming-cd78d-default-rtdb.firebaseio.com/categories/${categoryId}/products/${productId}.json`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [categoryId, productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container pdkolo">
      <div className="row">
        <div className="col-lg-6 col-md-12 mb-4">
          <div className="product-image-container">
            <img
              src={product.image}
              alt={product.name}
              className="product-image img-fluid"
            />
          </div>
        </div>
        <div className="col-lg-6 col-md-12">
          <div className="product-info-container">
            <div className="product-name mb-3"><span id="bol">Product Name : </span>{product.name}</div>
            <div className="product-description mb-3"><span id="bol">Description :</span> {product.description}</div>
            <div className="product-price mb-3">Price : ${product.price}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
