import React from 'react';
import Header from '../Header/Header';
import HeaderCarousel from '../Header/Header';
import MaintenancePage from '../Loading';
import { Col, Container, Row } from 'react-bootstrap';
import Numberss from '../About/Numberss';
import ProductSlider from '../../Dash/Sidebar/Test';
import './Home.css';
import WhySection from '../Why/WhySection';
import Feedback from '../Feedback/Feedback';
import FeedCompo from '../Feedback/FeedCompo';
import Mail from '../maillist/Mail';
const Home = () => {
    return (
        <div className='home'>
        <div className='sectiononehome'>
            <HeaderCarousel img1='https://storage-asset.msi.com/event/2023/MY/PBM/images/2023-3-banner.jpg' 
            img2='https://media.licdn.com/dms/image/D5612AQHAd0-B1gcpNw/article-cover_image-shrink_720_1280/0/1679951041459?e=2147483647&v=beta&t=DeWT7kN5bCRg9TatwXhJYEGFgiVKlmN0kKH5hnsDSWU'
            img3='https://www.elnekhelytechnology.com/image/catalog/1231231111.PNG'/>
            
        </div>
        <div className='sectiontwohome' style={{backgroundColor:'#F3F3F3'}}>
            <Container>
                <Row>
                    <Numberss/>
                </Row>
            </Container>
        </div>
        <div className='sectionthreehome'>
            <ProductSlider/>
        </div>
        <div className='sectionfourhome'>
            <WhySection/>
        </div>
        <div className='sectionfifthhome'>
            <Mail/>
        </div>
        </div>
    );
}

export default Home;
