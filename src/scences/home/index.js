import React, { useState, useEffect } from 'react';
import './home.css';
import logo from "../../components/img/img.png"
import creme from "../../components/img/CREME2.jpg"
import { db } from '../../components/firebase-config'
import { collection, getDocs } from 'firebase/firestore';
import { Box } from '@mui/material';
import background1 from './background5.mp4'
import background2 from './background2.mp4'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [backgroundVideo, setBackgroundVideo] = useState(background1);
  const [currentSet, setCurrentSet] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const itemsPerSet = 4;
  const totalSets = Math.ceil(products.length / itemsPerSet);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4000/produit');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data.data); // Assuming your products are under the 'data' key in the response
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);
  const handleScroll = () => {
    const header = document.getElementById('main-header');
    if (window.pageYOffset > 0) {
      header.style.opacity = '0';
    } else {
      header.style.opacity = '1';
    }
  };
  useEffect(() => {
    const updateBackgroundVideo = () => {
      if (window.innerWidth < 768) { // Change this value based on your desired breakpoint
        setBackgroundVideo(background2);
      } else {
        setBackgroundVideo(background1);
      }
    };
  
    updateBackgroundVideo();
    window.addEventListener('resize', updateBackgroundVideo);
  
    return () => window.removeEventListener('resize', updateBackgroundVideo);
  }, []);
  
  useEffect(() => {
    const fetchProducts = async () => {
      // Fetch products...
    };

    fetchProducts();
  }, []);

  const handleNext = () => {
    setCurrentSet((prevSet) => (prevSet + 1) % totalSets);
  };

  const handlePrev = () => {
    setCurrentSet((prevSet) => (prevSet - 1 + totalSets) % totalSets);
  };

  const toggleMenu = () => {
    const navMenu = document.getElementById('nav-menu');
    if (navMenu.style.display === 'block') {
      navMenu.style.display = 'none';
    } else {
      navMenu.style.display = 'block';
    }
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  
  return (
    <div>
     
      <main>
      <section id="home" className="banner">
      <Box sx={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <video autoPlay muted loop style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
  <source src={backgroundVideo} type="video/mp4" />
  Your browser does not support the video tag.
</video>

</Box>

        </section>

   
        <section id="shop" className="shop-section">
        <button className="carousel-btn prev-btn" onClick={handlePrev}>&lt;</button>
        {products
          .slice(currentSet * itemsPerSet, (currentSet + 1) * itemsPerSet)
          .map((product, index) => (
            <div key={index} className="item-container">
              <a href={`/productdetail/${product.id}`} className="item-link">
                <div className="item">
                  <img src={product.images[0].filepath ? product.images[0].filepath : ''} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p className="price">Prix: {product.price} DT</p>
                </div>
              </a>
            </div>
          ))}
        <button className="carousel-btn next-btn" onClick={handleNext}>&gt;</button>
      </section>


    <section id="blog">
      
    </section>

   
</main>


    </div>
  );
}

export default HomePage;
