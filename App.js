import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Main from './MainComponent';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </Provider>
  );
}

// import * as React from 'react';
// import MapView from 'react-native-maps';
// import { StyleSheet, Text, View, Dimensions } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <MapView style={styles.map} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 2,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   map: {
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height / 2,
//   },
// });
