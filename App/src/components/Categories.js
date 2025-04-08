// components/CategoryList.js
import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { categories } from '../data/categories';
import globalStyles from '../styles/global';

const CategoryList = () => {
  return (
    <View style={[globalStyles.container,{marginBottom: 50}]}>
    <Text style={globalStyles.header}> Categories </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={globalStyles.container}>
      {categories.map((category) => (
        <TouchableOpacity key={category.id} style={styles.card}>
          <Image source={{ uri: "https://picsum.photos/100" }} style={styles.image} />
          <Text style={styles.label}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 90,
    height: 90,
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginBottom: 10
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginBottom: 5,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default CategoryList;
