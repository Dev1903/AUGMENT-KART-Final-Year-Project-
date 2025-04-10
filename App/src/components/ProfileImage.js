// components/ProfileImage.js
import React, { useMemo } from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';

const ProfileImage = ({ uri, name, size = 40 }) => {
  const firstLetter = name?.charAt(0)?.toUpperCase() || '?';

  // Generate a random background color (memoized so it doesn't change during a single render)
  const backgroundColor = useMemo(() => {
    const colors = ['#4caf50', '#2196f3', '#ff9800', '#9c27b0', '#f44336', '#607d8b'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }, []);

  return uri ? (
    <Image source={{ uri }} style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]} />
  ) : (
    <View style={[styles.placeholder, { width: size, height: size, borderRadius: size / 2, backgroundColor }]}>
      <Text style={styles.initial}>{firstLetter}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    marginRight: 15,
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    paddingBottom:1
  },
  initial: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default ProfileImage;
