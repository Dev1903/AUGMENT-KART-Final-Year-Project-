import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Card, Button, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ item }) => {
  const [added, setAdded] = useState(false);
  const navigation = useNavigation();
  const { addToCart, updateQuantity, cartItems } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isFavorite = isInWishlist(item.id); // or product.id

  const cartItem = cartItems.find((cart) => cart.id === item.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    addToCart(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleIncrement = () => updateQuantity(item.id, quantity + 1);
  const handleDecrement = () => updateQuantity(item.id, quantity - 1);

  useEffect(() => {
    if (quantity === 0) setAdded(false);
  }, [quantity]);

  return (
    <Card
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    >
      <Card.Cover source={{ uri: 'https://picsum.photos/200' }} style={styles.image} />

      <Card.Content>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{item.name}</Text>
          <IconButton
            icon={isFavorite ? 'heart' : 'heart-outline'}
            size={20}
            style={{ marginRight: -5, backgroundColor: "#e0dede" }}
            iconColor="#4caf50"
            onPress={() => {
    isFavorite ? removeFromWishlist(item.id) : addToWishlist(item);
  }}
          />
        </View>
        <Text style={styles.price}>{item.price}</Text>
      </Card.Content>

      <Card.Actions style={styles.actions}>
        {quantity > 0 ? (
          <View style={styles.quantityControls}>
            <IconButton icon="minus" style={{ backgroundColor: "#e0dede", borderRadius: 10 }} iconColor="#4caf50" onPress={handleDecrement} />
            <Text style={styles.quantityText}>{quantity}</Text>
            <IconButton icon="plus" style={{ backgroundColor: "#e0dede", borderRadius: 10 }} iconColor="#4caf50" onPress={handleIncrement} />
          </View>
        ) : (
          <Button
            mode="contained"
            compact
            buttonColor={added ? '#2aa52f' : '#4caf50'}
            textColor="#ffffff"
            onPress={handleAddToCart}
            style={styles.button}
          >
            {added ? 'Added' : 'Add'}
          </Button>
        )}
      </Card.Actions>
    </Card>

  );
};

const styles = StyleSheet.create({
  card: {
    width: 160,
    height: 285,
    marginRight: 20,
    marginBottom: 10,
  },
  image: {
    height: 150,
  },
  actions: {
    justifyContent: 'center',
  },
  button: {
    width: '100%',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginLeft: -1
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  price: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },

});

export default ProductCard;
