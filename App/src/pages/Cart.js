import React from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, Image } from 'react-native';
import { Text, Button, Card, IconButton } from 'react-native-paper';
import { useCart } from '../context/CartContext';
import AppHeader from '../components/AppHeader';
import {EXPO_APP_BACKEND_URL} from "@env"

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();

    return (
        <SafeAreaView style={styles.safeArea}>
            <AppHeader title="Cart" />
            {/* Footer at the bottom */}
            {cartItems.length > 0 && (
                <View style={styles.footer}>
                    <View style={styles.totalBlock}>
                        <Text style={styles.totalLabel}>Total Cart Amount</Text>
                        <Text style={styles.totalValue}>₹{getTotal()}</Text>
                    </View>
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
                            <View style={styles.imageWrapper}>
                                <Image
                                    source={{ uri: `${EXPO_APP_BACKEND_URL}/images/product-images/${item.image}` }}
                                    style={styles.image}
                                />
                                <IconButton
                                    icon="delete"
                                    iconColor="#4caf50"
                                    size={20}
                                    style={styles.deleteIcon}
                                    onPress={() => removeFromCart(item.id)}
                                />
                            </View>
                            <View style={styles.details}>

                                <Text style={styles.name}>{item.name}</Text>

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
    },
    totalBlock: {
        flex: 1,
        justifyContent: 'center',
    },
    totalLabel: {
        fontSize: 16,
        color: '#444',
        fontWeight: 'bold',
    },
    totalValue: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
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
        height: 150,
        borderRadius: 8,
        borderBottomLeftRadius: 8,
        // margin: 10
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
    imageWrapper: {
        position: 'relative',
        width: 150,
        height: '100%',
        margin: 10,
    },

    deleteIcon: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#e0dede',
        zIndex: 1,
    },


});

export default Cart;
