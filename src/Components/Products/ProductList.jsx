// ProductList.js
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "./ProductCard";
import HeaderCarousel from "../Header/Header";
import { useParams } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { categoryId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://gaming-cd78d-default-rtdb.firebaseio.com/categories/${categoryId}/products.json`);
        const data = await response.json();
        const productArray = data ? Object.keys(data).map(id => ({ id, ...data[id], categoryId })) : [];
        setProducts(productArray);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [categoryId]);

  return (
    <>
      <div className='sectiononehome'>
        <HeaderCarousel 
          img1='https://storage-asset.msi.com/event/2023/MY/PBM/images/2023-3-banner.jpg' 
          img2='https://media.licdn.com/dms/image/D5612AQHAd0-B1gcpNw/article-cover_image-shrink_720_1280/0/1679951041459?e=2147483647&v=beta&t=DeWT7kN5bCRg9TatwXhJYEGFgiVKlmN0kKH5hnsDSWU'
          img3='https://www.elnekhelytechnology.com/image/catalog/1231231111.PNG'
        />
      </div>
      
      <Container>
        <Container>
          <Row>
            <Col id='feddiv'>
              <h2
                className="fancy"
                id="dividerfont"
                style={{
                  "--w": "50vw",
                  "--c": "#003c43",
                  "--b": "4px",
                  "--g": "-5px",
                  fontFamily: 'Knewave',
                }}
              >
                Our Products
              </h2>
            </Col>
          </Row>
        </Container>
        <Row>
          {products.map((product) => (
            <Col key={product.id} xs={12} sm={6} md={4} className="mb-4">
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default ProductList;
