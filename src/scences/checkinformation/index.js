import React, { useState, useEffect, useContext } from 'react';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../components/firebase-config';
import UserContext from '../../contexts/UserContext'; // Import the UserContext

const CheckInformation = () => {
  const { user, setUser } = useContext(UserContext); // Use the user data and setUser function from UserContext
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    gouvernorat: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const docRef = doc(db, 'users', user.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log('No such document!');
        }
      }
    };

    fetchUserData();
  }, [user]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const userRef = doc(db, 'users', user.id);
      await updateDoc(userRef, userData);
      setUser({ ...user, ...userData }); // Update the user data in the UserContext
      toast.success('Informations mises à jour avec succès!');
      navigate('/commande'); // Navigate to the commande page
    } catch (error) {
      console.error('Error updating user information:', error);
      toast.error('Erreur lors de la mise à jour des informations.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '100px' }}>
      <Typography variant="h4" gutterBottom>
        Vérifier les informations
      </Typography>
      <form onSubmit={handleUpdate}>
        <Grid container spacing={2}>
          {/* Add TextField components for each user data field */}
          <Grid item xs={12}>
            <TextField
              label="Prénom"
              name="firstName"
              fullWidth
              required
              value={userData.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Nom de famille"
              name="lastName"
              fullWidth
              required
              value={userData.lastName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="email"
              label="Email"
              name="email"
              fullWidth
              required
              value={userData.email}
              onChange={handleChange}
            />
          </Grid>
          {/* Add more TextField components for other user data fields */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Valider et mettre à jour
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CheckInformation;
