import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../components/img/img.png';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [visible, setVisible] = useState(true);
  const [cartCount, setCartCount] = useState(0); // State to store the cart count

  useEffect(() => {
    // Update cart count from local storage
    const updateCartCount = () => {
      const storedCartItems = JSON.parse(localStorage.getItem('panier')) || [];
      setCartCount(storedCartItems.length);
    };

    // Set up an interval to update cart count periodically
    const intervalId = setInterval(updateCartCount, 1000);

    updateCartCount(); // Initial update

    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      const header = document.getElementById('main-header');
      if (header) {
        setVisible(currentScrollY === 0 || currentScrollY < lastScrollY);
        lastScrollY = currentScrollY;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(intervalId);
    };
  }, []);

  let lastScrollY = window.pageYOffset;

  return (
    <header id="main-header" className={`transparent-header ${visible ? '' : 'hidden'}`}>
      <div className="header-container">
        <img src={logo} alt="You & Me Skin Care Logo" className="logo" />
        <nav>
          <ul className="nav-menu">
            <li><Link to="/">ACCUEIL</Link></li>
            <li><Link to="/about">À PROPOS</Link></li>
            <li><Link to="/shop">BOUTIQUE</Link></li>
            <li><Link to="/contact">CONTACTEZ-NOUS</Link></li>
            <li>
              <Link to="/cart">
                <FontAwesomeIcon icon={faShoppingCart} />
                {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
              </Link>
            </li>
            <li>
              <Link to="/login">
                <FontAwesomeIcon icon={faUser} />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
