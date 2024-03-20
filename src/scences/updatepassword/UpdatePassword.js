import React, { useState, useContext } from 'react';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import { toast } from 'react-toastify';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../components/firebase-config';
import UserContext from '../../contexts/UserContext'; // Import the UserContext

const UpdatePassword = () => {
  const { user } = useContext(UserContext); // Use the user data from UserContext
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('Le nouveau mot de passe et la confirmation ne correspondent pas.');
      return;
    }

    try {
      const userRef = doc(db, 'users', user.id);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists() || userDoc.data().password !== oldPassword) {
        toast.error('L\'ancien mot de passe est incorrect.');
        return;
      }

      await updateDoc(userRef, { password: newPassword });
      toast.success('Mot de passe mis à jour avec succès!');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du mot de passe:', error);
      toast.error('Erreur lors de la mise à jour du mot de passe.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '100px' }}>
      <Typography variant="h4" gutterBottom>
        Modifier le mot de passe
      </Typography>
      <form onSubmit={handleChangePassword}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              type="password"
              label="Ancien mot de passe"
              fullWidth
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="password"
              label="Nouveau mot de passe"
              fullWidth
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="password"
              label="Confirmer le nouveau mot de passe"
              fullWidth
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Mettre à jour
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default UpdatePassword;
