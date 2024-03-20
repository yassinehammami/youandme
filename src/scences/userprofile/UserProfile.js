import React, { useState, useEffect, useContext } from 'react';
import { db } from '../../components/firebase-config';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { Container, Typography, Paper, Grid, Button, List, ListItem, ListItemText, Divider } from '@mui/material';
import UserContext from '../../contexts/UserContext'; // Import the UserContext
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { user } = useContext(UserContext); // Use the user data from UserContext
  const [userData, setUserData] = useState(null);
  const [commandes, setCommandes] = useState([]);
  const navigate = useNavigate();

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

    const fetchCommandes = async () => {
      if (user) {
        const q = query(collection(db, 'commandes'), where('userId', '==', user.id));
        const querySnapshot = await getDocs(q);
        const commandesData = [];
        querySnapshot.forEach((doc) => {
          commandesData.push({ id: doc.id, ...doc.data() });
        });
        setCommandes(commandesData);
      }
    };

    fetchUserData();
    fetchCommandes();
  }, [user]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="sm" sx={{ marginTop: '100px' }}>
      <Typography variant="h4" gutterBottom>
        Profil de l'utilisateur
      </Typography>
      <Paper elevation={3} sx={{ padding: '20px', marginBottom: '20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1"><strong>Prénom:</strong> {userData.firstName}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1"><strong>Nom de famille:</strong> {userData.lastName}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1"><strong>Email:</strong> {userData.email}</Typography>
          </Grid>
          {/* Add more fields as needed */}
        </Grid>
      </Paper>
      <Typography variant="h5" gutterBottom>
        Historique des commandes
      </Typography>
      <List>
        {commandes.map((commande) => (
          <div key={commande.id}>
            <ListItem>
              <ListItemText
                primary={`Commande ID: ${commande.id}`}
                secondary={`Total: ${commande.totalPrice} DT - Date: ${commande.commandeDate.toDate().toLocaleDateString()} - Statut: ${commande.status}`}
              />
            </ListItem>
            <List>
              {commande.products.map((product, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`Produit ID: ${product.id}`}
                    secondary={`Prix: ${product.price} DT`}
                  />
                </ListItem>
              ))}
            </List>
            <Divider />
          </div>
        ))}
      </List>
      <Button variant="contained" color="primary" onClick={() => navigate('/updateuser')}>
        Mettre à jour les informations
      </Button>
    </Container>
  );
};

export default UserProfile;
