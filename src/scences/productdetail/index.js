import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../components/firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import './ProductDetail.css';
import axios from 'axios'; 

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImageUrl, setMainImageUrl] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:4000/produit/${productId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setProduct(data.data);
        // Set the main image URL to the first image in the images array
        if (data.data.images.length > 0) {
          setMainImageUrl(data.data.images[0].filepath);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('panier')) || [];
    const newCartItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: mainImageUrl,
    };

    cartItems.push(newCartItem);
    localStorage.setItem('panier', JSON.stringify(cartItems));

    toast.success('Product added to cart successfully!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const changeImage = (src) => {
    setMainImageUrl(src);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main-content">
      <main>
        <section className="product-description">
          <div className="product-image">
            <img src={mainImageUrl} alt={product.name} style={{ maxWidth: '300px', maxHeight: '300px' }} />
            <div className="image-options">
            {product.images && product.images.map((image, index) => (
                <button key={index} className="image-button" onClick={() => changeImage(image.filepath)}>
                  <img src={image.filepath} alt={`${product.name} Variant`} />
                </button>
              ))}
            </div>
          </div>
          <div className="product-info">
            <h1>{product.name}</h1>
            <p className="price">Prix: {product.price} DT</p>
            <div className="description">
              <p>{product.description}</p>
              <p>Volume: {product.volume}</p>
            </div>
            <button onClick={handleAddToCart} className="add-to-cart-btn">Ajouter au panier</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProductDetail;
