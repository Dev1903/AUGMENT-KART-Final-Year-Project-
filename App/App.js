import 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import BottomTabs from './src/components/BottomTabs';
import { NavigationContainer } from '@react-navigation/native';
import { CartProvider } from './src/context/CartContext';
import { WishlistProvider } from './src/context/WishlistContext';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <WishlistProvider>
          <CartProvider>
            <BottomTabs />
            <StatusBar style='dark' backgroundColor='white' />
          </CartProvider>
        </WishlistProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}
