// ProductCard.js
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-card__image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-card__content">
        <p className="product-card__title">{product.name}</p>
        <Button
          as={Link}
          to={`/products/${product.categoryId}/${product.id}`}
          variant="primary"
          className="mt-2"
        >
          More Details
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
