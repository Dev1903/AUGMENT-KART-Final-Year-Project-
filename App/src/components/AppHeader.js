import React, { useState } from 'react';
import { Appbar, Menu } from 'react-native-paper';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProfileImage from './ProfileImage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppHeader = ({ title }) => {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleProfile = () => {
    closeMenu();
    navigation.navigate('Profile');
  };

  const handleLogout = async () => {
    closeMenu();
    // Example: clear auth token or user data
    await AsyncStorage.removeItem('userToken'); // Adjust as per your app
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }], // Adjust according to your stack
    });
  };

  return (
    <Appbar.Header style={{ backgroundColor: 'white', justifyContent: 'space-between' }}>
      <Appbar.Content title={title} titleStyle={{ fontWeight: '600', fontSize: 24 }} />

      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <TouchableOpacity onPress={openMenu}>
            <ProfileImage uri={null} name={"Guest"} />
          </TouchableOpacity>
        }
        style={{ top: 100, width: 150,paddingRight: 15 }}
        contentStyle={{
          paddingVertical: 0,
          marginVertical: 0,
          borderRadius: 10,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          overflow: "hidden",
        }}
      >
        <Menu.Item onPress={handleProfile} title="Profile" />
        <Menu.Item onPress={handleLogout} title="Logout" style={{ backgroundColor: "#ff5959" }} />
      </Menu>
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
});

export default AppHeader;
