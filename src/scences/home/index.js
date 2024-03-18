import React, { useState, useEffect } from 'react';
import './home.css';
import logo from "../../components/img/img.png"
import creme from "../../components/img/CREME2.jpg"
import { db } from '../../components/firebase-config'
import { collection, getDocs } from 'firebase/firestore';
function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productList = [];
      querySnapshot.forEach((doc) => {
        productList.push({ id: doc.id, ...doc.data() });
      });
      setProducts(productList);
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

  return (
    <div>
      
      <main>
    <section id="home" class="banner">
        
    </section>

   
<section id="shop">

   
       
        {products.map((product) => (
  <a href={`/productdetail/${product.id}`} className="item-link" key={product.id}>
    <div className="item">
      <img src={product.imageUrls ? product.imageUrls[0] : ''} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">Prix: {product.price} DT</p>
    </div>
  </a>
))}

</section>
    <section id="blog">
      
    </section>

    <section id="contact">
       
    </section>
</main>
<section id="about"  class="about-section">
       
</section>
<footer>
    <div class="container footer-content">
        <div class="footer-section about">
            <h3>Soins de la Peau You & Me</h3>
            <p>Votre parcours vers une peau plus saine et plus heureuse commence ici.</p><p> Faites confiance à notre approche naturelle de la beauté.</p>
        </div>
        <div class="footer-section links">
            <h3>Liens Rapides</h3>
            <ul>
                <li><a href="#home">Accueil</a></li>
                <li><a href="#about">À Propos de Nous</a></li>
                <li><a href="#shop">Boutique</a></li>
                <li><a href="#contact">Contactez-Nous</a></li>
            </ul>
        </div>
        <div class="footer-section social">
            <h3>Suivez-Nous</h3>
            <p>Connectez-vous avec nous sur les réseaux sociaux</p><p>
                 pour les dernières mises à jour.</p>
            <div class="social-icons">
                <a href="https://www.facebook.com/youandmetunisia" target="_blank" class="social-icon"><i class="fab fa-facebook-f"></i></a>
                <a href="https://www.instagram.com/youandme_skincare?igsh=MWJyeGd0bHBiYzRsMQ==" target="_blank" class="social-icon"><i class="fab fa-instagram"></i></a>
            </div>
        </div>
        <div class="footer-section contact">
            <h3>Informations de Contact</h3>
            <ul>
                <li><i class="fa fa-map-marker"></i><strong> Adresse :</strong> Rue bouraoui zaanouni Jawhara sousse 4000</li>
                <li><i class="fa fa-phone"></i><strong> Téléphone :</strong> 52 949 949</li>
                <li><i class="fa fa-envelope"></i><strong> Email :</strong> youandme.tunisia@gmail.com</li>
            </ul>
        </div>
    </div>
    <div class="footer-bottom">
        &copy; 2024 Soins de la Peau You & Me. Tous droits réservés.
    </div>
</footer>
    </div>
  );
}

export default HomePage;
