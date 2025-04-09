import React from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, Image } from 'react-native';
import { Text, Button, Card, IconButton } from 'react-native-paper';
import { useCart } from '../context/CartContext';
import AppHeader from '../components/AppHeader';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();

    return (
        <SafeAreaView style={styles.safeArea}>
            <AppHeader title="Cart" />
            {/* Footer at the bottom */}
            {cartItems.length > 0 && (
                <View style={styles.footer}>
                    <Text style={styles.total}>
                        Total Cart Amount: <Text style={[styles.total, { fontSize: 30 }]}>₹{getTotal()}</Text>
                    </Text>
                    <Button mode="contained" onPress={() => clearCart()} style={{ backgroundColor: '#4caf50' }}>
                        Clear Cart
                    </Button>
                </View>
            )}
            <FlatList
                data={cartItems}
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
                                        icon="delete"
                                        iconColor="#4caf50"
                                        size={25}
                                        style={{backgroundColor: "#e0dede"}}
                                        onPress={() => removeFromCart(item.id)}
                                    />
                                </View>
                                <Text style={styles.price}>Price: {item.price}</Text>
                                <Card.Actions style={styles.quantityRow}>
                                    <IconButton
                                        icon="minus"
                                        iconColor="#4caf50"
                                        size={20}
                                        onPress={() => updateQuantity(item.id, item.quantity - 1)}
                                    />
                                    <Text style={styles.quantityText}>{item.quantity}</Text>
                                    <IconButton
                                        icon="plus"
                                        iconColor="#4caf50"
                                        size={20}
                                        onPress={() => updateQuantity(item.id, item.quantity + 1)}
                                    />
                                </Card.Actions>
                            </View>
                        </View>
                    </Card>
                )}
                contentContainerStyle={cartItems.length === 0 ? styles.emptyContainer : styles.contentContainer}
                ListEmptyComponent={<Text style={styles.emptyText}>🛒 Your cart is empty</Text>}
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
    card: {
        marginBottom: 10,
        marginHorizontal: 10,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#eee',
        backgroundColor: '#f9f9f9',
    },
    total: {
        fontSize: 18,
        flex: 1,
        fontWeight: 'bold',
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
        borderBottomLeftRadius: 8,
        margin: 10
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
    quantityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    quantityText: {
        fontSize: 16,
        marginHorizontal: 8,
        minWidth: 24,
        textAlign: 'center',
    },

});

export default Cart;
