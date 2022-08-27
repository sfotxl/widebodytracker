import MapView, { Marker } from 'react-native-maps';
import Plane from './assets/plane.png';
import { useSelector } from 'react-redux';
import { StyleSheet, Dimensions } from 'react-native';
import { fetchFlights } from './features/flights/flightsSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const Map = ({ latitude, longitude }) => {
  const flightdata = fetchFlights();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFlights());
  }, [dispatch]);
  console.log('flightdata:', flightdata);

  return (
    <MapView
      region={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.4221,
      }}
      style={styles.map}
    >
      {flightdata.states.map((item) => {
        <Marker
          coordinate={{
            latitude: item[5],
            longitude: item[6],
          }}
          image={Plane}
        />;
      })}
      <Marker
        coordinate={{
          latitude: latitude,
          longitude: longitude,
        }}
        image={Plane}
      />
    </MapView>
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

export default Map;
