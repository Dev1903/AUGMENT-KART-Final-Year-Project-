import React, { useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { Searchbar } from 'react-native-paper';
import * as Updates from 'expo-updates';
import AppHeader from '../components/AppHeader';
import CategoryList from '../components/Categories';
import NewlyLaunched from '../components/NewlyLaunched';
import ImageSlider from '../components/ImageSlider';

const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await Updates.reloadAsync();
    } catch (err) {
      console.error(err);
      setRefreshing(false);
    }
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={['#4caf50']}
          tintColor="#4caf50"
          progressViewOffset={90}
        />
      }
      style={{backgroundColor: "white"}}
    >
      <AppHeader title="Grocery Store" />
      <Searchbar placeholder="Search groceries..." style={{ margin: 10 }} />
      <ImageSlider />
      <CategoryList />
      <NewlyLaunched />
    </ScrollView>
  );
};

export default HomeScreen;
