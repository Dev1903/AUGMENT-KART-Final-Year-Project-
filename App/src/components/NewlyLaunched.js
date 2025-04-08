import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { products } from '../data/products';
import ProductCard from './ProductCard';
import globalStyles from '../styles/global';

const NewlyLaunched = () => {
  const sorted = [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const recentItems = sorted.slice(0, 10);

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.header}>Newly Launched</Text>
      <FlatList
        data={recentItems}
        keyExtractor={(item) => item.id + Math.random()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        renderItem={({ item }) => <ProductCard item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 15,
  },
 
});

export default NewlyLaunched;
