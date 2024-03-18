import React, { useState, useEffect, useContext } from 'react';
import { Container, Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserContext from '../../contexts/UserContext';
import axios from 'axios';

const Commande = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [id , setId]= useState();

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('panier')) || [];
    const id =localStorage.getItem('id');
    setId(id);
    setCartItems(storedCartItems);
  }, []);

  const calculateTotalPrice = () => {
    return cartItems.reduce((acc, item) => acc + item.price, 0);
  };

  const handleSubmit = async () => {
    // if (!user) {
    //   toast.error('Veuillez vous connecter pour passer une commande.');
    //   navigate('/login');
    //   return;
    // }

    try {
      const commandeData = {
        userId: id,
        state:"en cours",
        produitIds: cartItems.map((item) => item.productId), 
        totalPrice: calculateTotalPrice(),
      };
      
      const res = await axios.post('http://192.168.1.193:4000/commande/create', commandeData); // Replace 'your-api-url' with your actual API endpoint
      
      if (res.status === 201) {
        localStorage.removeItem('panier');
        toast.success('Commande soumise avec succès!');
        navigate('/confirmation');
      } else {
        toast.error('Erreur lors de la soumission de la commande.');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      toast.error('Erreur lors de la soumission de la commande.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '100px' }}>
      <Typography variant="h4" gutterBottom>
        Récapitulatif de la commande
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="body1">Total des produits: {calculateTotalPrice()} DT</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button type="button" variant="contained" color="primary" fullWidth onClick={handleSubmit}>
            Soumettre la commande
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Commande;
