// App.js
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Navy from './Components/Navbar/Nav';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import MaintenancePage from './Components/Loading';
import Footer from './Components/Navbar/Footer';
import Head from './Components/Navbar/Head';
import About from './Components/About/About';
import Contact from './Components/Contact/Contact';
import Feedback from './Components/Feedback/Feedback';
import Sidebar from './Dash/Sidebar/Sidebar';
import ProductSlider from './Dash/Sidebar/Test';
import ProductList from './Components/Products/ProductList';
import ProductDetails from './Components/Products/ProductDetails';
import CategoryCard from './Components/Products/ProductsCateg';
import Dashboard from './Dash/Dashboard/Dashboard';
import AddReview from './Dash/Dashboard/Reviews/AddReview';
import TheReviews from './Dash/Dashboard/Reviews/TheReviews';
import AddCategory from './Dash/Dashboard/Categories/AddCategory';
import TheCategories from './Dash/Dashboard/Categories/TheCategories';
import AddProducts from './Dash/Dashboard/Products/AddProducts';
import ProductMaintenance from './Dash/Dashboard/Products/TheProducts';
import TheProducts from './Dash/Dashboard/Products/TheProducts';
import TheCommonProducts from './Dash/Dashboard/CommonProducts/TheCommonProducts';
import CommonPage from './Dash/Dashboard/CommonProducts/CommonPage';
import RealFB from './Dash/Dashboard/RealFb/RealFB';
import ContactUSManage from './Components/Contact/ContactusManage';
import TheMails from './Dash/Dashboard/maillist/TheMails';

function App() {
  return (
    <BrowserRouter>
      <Head />
      <Navy />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/dash" element={<ProductSlider />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:categoryId" element={<ProductList />} />
        <Route path="/products/:categoryId/:productId" element={<ProductDetails />} />
        <Route path="/cate" element={<CategoryCard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addreview" element={<AddReview />} />
        <Route path="/thereviews" element={<TheReviews />} />
        <Route path="/addcategory" element={<AddCategory />} />
        <Route path="/thecategories" element={<TheCategories />} />
        <Route path="/addproduct" element={<AddProducts />} />
        <Route path="/theproducts" element={<TheProducts />} />
        <Route path="/thecommonProducts" element={<TheCommonProducts />} />
        <Route path="/addCommonProducts" element={<CommonPage />} />
        <Route path="/RealFeedback" element={<RealFB />} />
        <Route path="/contactmanage" element={<ContactUSManage />} />
        <Route path="/mailssub" element={<TheMails />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
