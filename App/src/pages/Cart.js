import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text, Button, Card, IconButton } from 'react-native-paper';
import { useCart } from '../context/CartContext';
import AppHeader from '../components/AppHeader';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();

    return (
        <View style={styles.container}>
            <AppHeader title="Cart" />
            <View style={styles.footer}>
                            <Text style={styles.total}>Total Cart Amount: <Text style={[styles.total,{fontSize:30}]}>₹{getTotal()}</Text></Text>
                            <Button mode="contained" onPress={() => clearCart()}>
                                Clear Cart
                            </Button>
                        </View>
            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View>
                        
                        <Card style={styles.card}>
                            <Card.Title title={item.name} subtitle={`Price: ${item.price}`} />
                            <Card.Content>
                                <Text>Quantity: {item.quantity}</Text>
                            </Card.Content>
                            <Card.Actions>
                                <IconButton icon="minus" onPress={() => updateQuantity(item.id, item.quantity - 1)} />
                                <IconButton icon="plus" onPress={() => updateQuantity(item.id, item.quantity + 1)} />
                                <IconButton icon="delete" onPress={() => removeFromCart(item.id)} />
                            </Card.Actions>
                        </Card>

                    </View>
                )}
                contentContainerStyle={
                    cartItems.length === 0 ? styles.emptyContainer : styles.container
                }
                ListEmptyComponent={<Text style={styles.emptyText}>🛒 Your cart is empty</Text>}
            />



        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, },
    card: { marginBottom: 10 },
    footer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical:10,
        marginTop: 10,
        alignItems: 'center',
    },
    total: {
        fontSize: 18,
        flex:1,
        fontWeight: 'bold',
        justifyContent: "center",
        alignItems:"center"
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
});

export default Cart;
