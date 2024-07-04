import React from "react"
import './Footer.css';
import pho from '../../assets/imgs/h-colored.png'
const Footer = () => <footer className="page-footer font-small blue pt-4">
    <div className="container-fluid text-center text-md-left">
        <div className="row">
        <div className="col-md-4 mb-md-0 mb-3 ">
               <img src={pho} width={'250px'} className="fot"/>
                <h3 id="fotertitle" >
               The World of PC and Electronic Accessories
                </h3>
            </div>
        <div className="col-md-2 mb-md-0 mb-3">
                <h5 className="text-uppercase" style={{fontFamily:'secondaryfont'}}>Hook</h5>

                <ul className="list-unstyled linksfooter">
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About us</a></li>
                    <li><a href="/contact">Contact Us</a></li>
                    <li><a href="/">Products</a></li>
                </ul>
            </div>

            <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase">Our Social Media</h5>
                <ul className="list-unstyled linksfooter">
                    <li><a href="/">Facebook</a></li>
                    <li><a href="/">Instagram</a></li>
                    <li><a href="/">Tiktok</a></li>
                    <li><a href="/">Whatsapp</a></li>
                </ul>
            </div>

            <div className="col-md-3 mb-md-0 mb-3">
                <h4 className="text-uppercase" style={{color:'#FFC55A'}}>BE THE FIRST TO KNOW</h4>
                <h6>
Get special offers, exclusive product news, and event info straight to your inbox.
</h6>
<form className="subscribe-form" >
      <div className="custom-input-group">
        <input
          type="email"
          className="custom-input"
          id="customEmail"
          name="customEmail"
          placeholder="YOUR Phone"
          autoComplete="off"
        />
        <input className="custom-submit-button" value="Subscribe" type="submit" />
      </div>
    </form> 
            </div>

      
        </div>
    </div>

    <div className="footer-copyright text-center py-3">
    </div>

</footer>

export default Footer;