import React from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, Image } from 'react-native';
import { Text, Card, Button,IconButton } from 'react-native-paper';
import { useWishlist } from '../context/WishlistContext';
import AppHeader from '../components/AppHeader';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title="Wishlist" />
      {wishlistItems.length > 0 && (
                <View style={styles.footer}>
                    <Button mode="contained" onPress={() => clearWishlist()} style={{ backgroundColor: '#4caf50' }}>
                        Clear Wishlist
                    </Button>
                </View>
            )}
      <FlatList
        data={wishlistItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <Image
                source={{ uri: 'https://picsum.photos/100' }} // Replace with item.image if you have it
                style={styles.image}
              />
              <View style={styles.details}>
                <View style={styles.headerRow}>
                  <Text style={styles.name}>{item.name}</Text>
                  <IconButton
                    icon="heart-off"
                    iconColor="#4caf50"
                    size={25}
                    style={{ backgroundColor: '#e0dede' }}
                    onPress={() => removeFromWishlist(item.id)}
                  />
                </View>
                <Text style={styles.price}>Price: {item.price}</Text>
              </View>
            </View>
          </Card>
        )}
        contentContainerStyle={
          wishlistItems.length === 0 ? styles.emptyContainer : styles.contentContainer
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>💚 Your wishlist is empty</Text>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    padding: 10,
  },
  footer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: '100%'
    },
  card: {
    marginBottom: 10,
    marginHorizontal: 10,
    height: 115
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
  },
  image: {
    width: 150,
    height: '90%',
    borderRadius: 8,
    margin: 10,
  },
  cardContent: {
    flexDirection: 'row',
  },
  details: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  price: {
    fontSize: 16,
    color: '#666',
    marginVertical: 4,
  },
});

export default Wishlist;
