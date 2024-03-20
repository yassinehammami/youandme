import React, { useState, useEffect, useContext } from 'react';
import { db } from '../../components/firebase-config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Container, Typography, Paper, Grid, TextField, Button } from '@mui/material';
import UserContext from '../../contexts/UserContext'; // Import the UserContext
import { toast } from 'react-toastify';

const UserProfile = () => {
  const { user } = useContext(UserContext); // Use the user data from UserContext
  const [userData, setUserData] = useState({
    // Initialize with empty strings
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
      toast.success('User information updated successfully!');
    } catch (error) {
      console.error('Error updating user information:', error);
      toast.error('Error updating user information.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '100px' }}>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      <Paper elevation={3} sx={{ padding: '20px' }}>
        <form onSubmit={handleUpdate}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Address"
                name="address"
                fullWidth
                value={userData.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="City"
                name="city"
                fullWidth
                value={userData.city}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Postal Code"
                name="postalCode"
                fullWidth
                value={userData.postalCode}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone"
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
                Update
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default UserProfile;
