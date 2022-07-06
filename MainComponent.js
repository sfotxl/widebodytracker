import HomeScreen from './HomeScreen.js';
import { View, Text, ScrollView } from 'react-native';

const screenOptions = {
  headerStyle: { backgroundColor: 'navy' },
};

const Main = () => {
  return (
    <View>
      <HomeScreen />
    </View>
  );
};

export default Main;
