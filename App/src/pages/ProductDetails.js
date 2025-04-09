import React, { useState } from 'react';
import { View, Image, StyleSheet, ScrollView } from 'react-native';
import { Button, Text, Title, Paragraph, Divider } from 'react-native-paper';
import { useCart } from '../context/CartContext';

const ProductDetails = ({ route, navigation }) => {
  const { product } = route.params;
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: 'https://picsum.photos/200' }} style={styles.image} />
      <View style={styles.content}>
        <Title>{product.name}</Title>
        <Text style={styles.price}>{product.price}</Text>
        <Text style={styles.category}>Category: {product.category}</Text>
        <Divider style={{ marginVertical: 10 }} />
        <Paragraph>
          Fresh and high-quality {product.name} available now! Perfect for your daily grocery needs.
        </Paragraph>
        <Button
          mode="contained"
          style={[styles.button, { backgroundColor: added ? '#2aa52f' : '#4caf50' }]}
          textColor="#ffffff"
          onPress={handleAddToCart}
        >
          {added ? 'Added' : 'Add to Cart'}
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 400,
  },
  content: {
    padding: 16,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  category: {
    fontStyle: 'italic',
    color: '#666',
    marginBottom: 8,
  },
  button: {
    marginTop: 20,
    width: '100%', // Full width
  },
});

export default ProductDetails;
