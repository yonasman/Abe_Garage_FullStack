import logo from "../../../assets/images/logo.png"
function Header() {
  return (
    <div>
    <header className="main-header header-style-one">
        <div className="header-top">
            <div className="auto-container">
                <div className="inner-container">
                    <div className="left-column">
                        <div className="text">Enjoy the Beso While we fix your car!</div>
                        <div className="office-hour">Monday - Saturday 7:00AM - 6:00PM</div>
                    </div>
                    <div className="right-column">
                    <div className="phone-number">Schedule Your Appontment Today : <strong>1800 456 7890</strong></div>
                    </div>
                </div>
            </div>
        </div>

        <div className="header-upper">
            <div className="auto-container">
                <div className="inner-container">
                    <div className="logo-box">
                        <div className="logo"><a href="index.html"><img src={logo} alt=""/></a></div>
                    </div>
                    <div className="right-column">
                        <div className="nav-outer">
                            <div className="mobile-nav-toggler"><img src="assets/images/icons/icon-bar.png" alt=""/></div>
                            <nav className="main-menu navbar-expand-md navbar-light">
                                <div className="collapse navbar-collapse show clearfix" id="navbarSupportedContent">
                                    <ul className="navigation">
                                        <li className="dropdown"><a href="index.html">Home</a>
                                        </li>
                                        <li className="dropdown"><a href="about.html">About Us</a>
                                        </li>
                                        <li className="dropdown"><a href="service-1.html">Services</a>
                                        </li>
                                        <li><a href="contact.html">Contact Us</a></li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                        <div className="search-btn">
                            <button type="button" className="theme-btn search-toggler"></button></div>
                        <div className="link-btn"><a href="#" className="theme-btn btn-style-one">Sign in </a> 
                        </div> 
                    </div>                        
                </div>
            </div>
        </div>
        </header>
    </div>
  )
}

export default Header
