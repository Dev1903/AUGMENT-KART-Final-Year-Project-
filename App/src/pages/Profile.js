import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import AppHeader from '../components/AppHeader';

const Profile = () => {
    return (
        <SafeAreaView style={styles.container}>
            <AppHeader title="Profile" />
        </SafeAreaView>
    )
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white"
    }
})
