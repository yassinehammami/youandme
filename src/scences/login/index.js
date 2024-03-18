import React, { useState, useContext } from 'react';
import { Container, Typography, TextField, Button, Grid, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../components/firebase-config';
import  UserContext  from '../../contexts/UserContext'; // Import the UserContext

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext); // Use the setUser function from UserContext
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Query the "users" collection for a document with the provided email and password
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', email), where('password', '==', password));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        toast.error('Email ou mot de passe incorrect.');
        return;
      }

      querySnapshot.forEach((doc) => {
        // Set the user data in the UserContext
        setUser({ id: doc.id, ...doc.data() });
        toast.success('Connexion réussie!');
        navigate('/checkinformation'); // Navigate to the check information page after successful login
      });
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('Erreur lors de la connexion.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '100px' }}>
      <Typography variant="h4" gutterBottom>
        Connexion
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              type="email"
              label="Email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="password"
              label="Mot de passe"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Se connecter
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              Pas de compte ?{' '}
              <Link href="#" onClick={() => navigate('/signup')} underline="hover">
                Créer mon compte
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Login;
