import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';

const ProductCard = ({ item }) => {
  const [added, setAdded] = useState(false);  // Local state for tracking if the item is added
  const navigation = useNavigation();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(item);      // Add the item to the cart
    setAdded(true);       // Set the button text to "Added"
    
    setTimeout(() => {
      setAdded(false);    // Reset the button text back to "Add" after 1 second
    }, 1500);
  };

  return (
    <Card
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    >
      <Card.Cover source={{ uri: 'https://picsum.photos/200' }} style={styles.image} />
      <Card.Title title={item.name} subtitle={item.price} titleStyle={{fontSize: 20, fontWeight: "bold"}} />
      <Card.Actions style={styles.actions}  >
        <Button
          mode="contained"
          compact
          buttonColor={added ? "#2aa52f" : "#4caf50"}
          textColor="#ffffff"
          onPress={handleAddToCart}
          style={styles.button}  // Add this line to make the button fill the width
        >
          {added ? ' Added' : ' Add'}  {/* Toggle button text based on the state */}
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 160,
    marginRight: 20,
    marginBottom: 10,
  },
  image: {
    height: 150,
  },
  actions: {
    justifyContent: 'center', // Optional: Center the actions vertically
  },
  button: {
    width: '100%',  // This makes the button fill the entire width of the card
  },
});

export default ProductCard;
