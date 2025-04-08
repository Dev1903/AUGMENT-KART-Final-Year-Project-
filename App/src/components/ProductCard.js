import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';

const ProductCard = ({ item }) => {
  const navigation = useNavigation();
  const { addToCart } = useCart();

  return (
    <Card
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    >
      <Card.Cover source={{ uri: 'https://picsum.photos/200' }} style={styles.image} />
      <Card.Title title={item.name} subtitle={item.price} />
      <Card.Actions>
        <Button mode="contained" compact onPress={() => {addToCart(item)}}>
          Add
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
});

export default ProductCard;
