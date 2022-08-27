import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import Plane from '../../../assets/plane.png';
import { StyleSheet, Dimensions } from 'react-native';
import { View, Text } from 'react-native';

const Houston = ({ flights }) => {
  const latitude = 29.9902;
  const longitude = -95.3368;
  if (flights) {
    console.log('flights:', flights);
    console.log('flights.states:', flights[5]);
    return (
      <>
        <Text>Number of Scheduled Flights: {flights.length}</Text>
        <MapView
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0322,
            longitudeDelta: 0.4221,
          }}
          style={styles.map}
        >
          <Marker
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
            image={Plane}
          />
          {flights.map((flight) => {
            flight.map((item) => {
              console.log(item);
              <Marker
                coordinate={{
                  latitude: item[3],
                  longitude: item[4],
                }}
                image={Plane}
              />;
            });
          })}
        </MapView>
      </>
    );
  }
  return (
    <View>
      <Text>No data</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: 400,
  },
  text: {
    color: 'white',
    backgroundColor: 'navy',
    textAlign: 'center',
  },
});

export default Houston;
