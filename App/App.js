import 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import BottomTabs from './src/components/BottomTabs';
import { NavigationContainer } from '@react-navigation/native';
import { CartProvider } from './src/context/CartContext';

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <CartProvider>
          <BottomTabs />
        </CartProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}
