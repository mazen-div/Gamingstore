import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './ProductsCateg.css';
import HeaderCarousel from '../Header/Header';

function CategoryCard() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('https://gaming-cd78d-default-rtdb.firebaseio.com/categories.json')
      .then(response => response.json())
      .then(data => {
        let categoryArray = [];
        if (data) {
          Object.keys(data).forEach(categoryId => {
            const categoryData = data[categoryId];
            if (categoryData.categories) {
              // Nested categories
              Object.keys(categoryData.categories).forEach(subCategoryId => {
                const subCategoryData = categoryData.categories[subCategoryId];
                categoryArray.push({
                  id: subCategoryId,
                  name: subCategoryData.name,
                  img: subCategoryData.image
                });
              });
            } else {
              // Single-level categories
              categoryArray.push({
                id: categoryId,
                name: categoryData.name,
                img: categoryData.image
              });
            }
          });
        }
        setCategories(categoryArray);
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  return (
    <>
      <HeaderCarousel
        img1='https://storage-asset.msi.com/event/2023/MY/PBM/images/2023-3-banner.jpg'
        img2='https://media.licdn.com/dms/image/D5612AQHAd0-B1gcpNw/article-cover_image-shrink_720_1280/0/1679951041459?e=2147483647&v=beta&t=DeWT7kN5bCRg9TatwXhJYEGFgiVKlmN0kKH5hnsDSWU'
        img3='https://www.elnekhelytechnology.com/image/catalog/1231231111.PNG'
      />
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
              Our Common Categories
            </h2>
          </Col>
        </Row>
      </Container>
      <Container className="my-5">
        <Row className="justify-content-center">
          {categories.map((category, index) => (
            <Col key={index} xs={12} sm={6} md={3}>
              <div className='articleWrapper'>
                <div className='containerProject'>
                  <img src={category.img} alt={category.name} style={{ width: '100%', height: '100%', objectFit: 'fill' }} />
                </div>
                <div className='projectInfo'>
                  <h3 className='projectTitle text-center'>{category.name}</h3>
                  <Button as={Link} to={`/products/${category.id}`} variant="primary">
                    View Items
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default CategoryCard;
