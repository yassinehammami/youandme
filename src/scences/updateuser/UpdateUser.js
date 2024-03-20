import React, { useState, useEffect, useContext } from 'react';
import { db } from '../../components/firebase-config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Container, Typography, Paper, Grid, TextField, Button } from '@mui/material';
import UserContext from '../../contexts/UserContext'; // Import the UserContext
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

const UpdateUser = () => {
  const { user } = useContext(UserContext); // Use the user data from UserContext
  const [userData, setUserData] = useState({
    // Initialize with empty strings
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    gouvernorat: '',
  });
  const navigate = useNavigate(); // Initialize useNavigate
  const [token, setToken]= useState();
  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token);
    
    // const fetchUserData = async () => {
    //   if (user) {
    //     const docRef = doc(db, 'users', user.id);
    //     const docSnap = await getDoc(docRef);
    //     if (docSnap.exists()) {
    //       setUserData(docSnap.data());
    //     } else {
    //       console.log('No such document!');
    //     }
    //   }
    // };
  }, [user]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
        try {
            console.log(userData);
            const res = await axios.put(`http://localhost:4000/user/update/${user.id}`, userData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            const { message, user: updatedUser } = res.data;
            if (message === "User not found") {
              toast.error("utilisateur n'existe pas");
            } else if (message === "Error updating user") {
              toast.error('Vérifiez vos données');
            }  else if(res.data.message=="Unauthorized: Access token is required"){
              navigate('/login');
            } else {
                setUserData(updatedUser);
              toast.success('Informations mises à jour avec succès!');
              navigate('/commande');
            }
          } catch (error) {
            console.error('Error updating user information:', error);
            toast.error('Erreur lors de la mise à jour des informations.');
          }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '100px' }}>
      <Typography variant="h4" gutterBottom>
        Mettre à jour l'utilisateur
      </Typography>
      <Paper elevation={3} sx={{ padding: '20px' }}>
        <form onSubmit={handleUpdate}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Adresse"
                name="address"
                fullWidth
                value={userData.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Ville"
                name="city"
                fullWidth
                value={userData.city}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Code postal"
                name="postalCode"
                fullWidth
                value={userData.postalCode}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Téléphone"
                name="phone"
                fullWidth
                value={userData.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Gouvernorat"
                name="gouvernorat"
                fullWidth
                value={userData.gouvernorat}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Mettre à jour
              </Button>
            </Grid>
          </Grid>
        </form>
        <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={() => navigate('/updatepassword')}>
          Modifier le mot de passe
        </Button>
      </Paper>
    </Container>
  );
};

export default UpdateUser;
