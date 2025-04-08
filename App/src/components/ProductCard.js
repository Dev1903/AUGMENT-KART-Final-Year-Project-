import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-paper';

const ProductCard = ({ item }) => {
  return (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: "https://picsum.photos/200" }} style={styles.image} />
      <Card.Title title={item.name} subtitle={item.price} />
      <Card.Actions>
        <Button mode="contained" compact onPress={() => console.log('Add', item.name)}>
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
    marginBottom:10
  },
  image: {
    height: 150,
  },
});

export default ProductCard;
