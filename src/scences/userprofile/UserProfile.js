import React, { useState, useEffect, useContext } from 'react';
import { Container, Typography, Paper, Grid, Button, List, ListItem, ListItemText, Divider } from '@mui/material';
import UserContext from '../../contexts/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'

const UserProfile = () => {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const [commandes, setCommandes] = useState([]);
  const navigate = useNavigate();
  const [token, setToken]= useState();
  const [id , setId]=useState();
  useEffect(() => {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    setToken(token);
    setId(id);
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/user/${id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { data } = res.data;
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchCommandes = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/commande/userById/${id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { data } = res.data;
        setCommandes(data);
      } catch (error) {
        console.error('Error fetching user commands:', error);
      }
    };
      fetchUserData();
      fetchCommandes();
  }, [id]);

  if (!userData || !commandes) {
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
                secondary={`Total: ${commande.totalPrice} DT - Date: ${new Date(commande.commandeDate).toLocaleDateString()} - Statut: ${commande.state}`}
              />
            </ListItem>
            <List>
              {commande.products.map((product, index) => (
                <ListItem key={index}>
                  <ListItemText
                      primary={`Produit ID: ${product.id}`}
                      secondary={[
                        `Nom: ${product.name}`,
                        `Quantité: ${product.quantity}`,
                      ]}
                    />
                </ListItem>
              ))}
            </List>
            <Divider />
          </div>
        ))}
      </List>
      <Button variant="contained" color="primary" onClick={() => navigate(`/updateuser/${id}`)}>
        Mettre à jour les informations
      </Button>
    </Container>
  );
};

export default UserProfile;
