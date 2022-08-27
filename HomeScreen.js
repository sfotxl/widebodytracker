import {
  Text,
  View,
  ScrollView,
  Button,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { fetchFlights } from './features/flights/flightsSlice';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import { AIRPORTS } from './features/flights/airports/airports';
import { fetchURL } from './fetchURL';
import Plane from './assets/plane75.png';
import Map from './ Map';
import Houston from './features/flights/airports/IAH';

const HomeScreen = () => {
  const hours = new Date().getHours();
  const minutes = new Date().getMinutes();
  const curTime = `${hours}: ${minutes}`;
  const flights = useSelector((state) => state.flights.flightsArray);

  console.log('flights:', flights);

  const [latitude, setLatitude] = useState(37.78825);
  const [longitude, setLongitude] = useState(-122.4324);
  const [lamin, setLamin] = useState(0);
  const [lamax, setLamax] = useState(0);
  const [lomin, setLomin] = useState(0);
  const [lomax, setLomax] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFlights());
  }, [dispatch]);

  const IAH = () => {
    setLatitude(29.9902);
    setLongitude(-95.3368);
    setLamin(29.63587);
    setLamax(30.25964);
    setLomin(-95.9047);
    setLomax(-94.93275);
  };

  const SFO = () => {
    setLatitude(37.78825);
    setLongitude(-122.4324);
  };

  const LAX = () => {
    setLatitude(33.9416);
    setLongitude(-118.4085);
  };

  const renderItem = ({ item }) => (
    <View>
      <Text style={styles.text}>{item[2]}</Text>
      <Text style={styles.text}>{item[1]}</Text>
      <Text style={styles.text}>{item[5]}</Text>
    </View>
  );

  return (
    <>
      <View
        style={{
          paddingTop: 60,
          paddingLeft: 0,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            backgroundColor: 'navy',
            color: 'white',
            textAlign: 'center',
          }}
        >
          Current Time: {curTime}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            backgroundColor: 'navy',
            color: 'white',
          }}
        >
          Choose an airport near you.
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          backgroundColor: 'lightgray',
        }}
      >
        <TouchableOpacity style={styles.button} onPress={IAH}>
          <Text>IAH</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={SFO}>
          <Text>SFO</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={LAX}>
          <Text>LAX</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity
          style={styles.button}
          onpress={() => {
            dispatch(fetchFlights());
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              backgroundColor: 'navy',
            }}
          >
            Find Wide-Body Aircraft Near You
          </Text>
        </TouchableOpacity>
        {/* <Button
          title='Find Wide-Body Aircraft Near You'
          color='navy'
          onPress={() => dispatch(fetchFlights())}
        /> */}
        {/* <View style={styles.container}> */}

        {/* Map component */}
        <MapView
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0322,
            longitudeDelta: 0.4221,
          }}
          style={styles.map}
        >
          {/* {flights.states.map((item) => {
            <Marker
              coordinate={{
                latitude: item[5],
                longitude: item[6],
              }}
              image={Plane}
            />;
          })} */}
          <Marker
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
            image={Plane}
          />
        </MapView>
        {/* <Houston flights={flights.states} /> */}
        <Text style={styles.text}>
          Number of Flights Scheduled: {flights.states.length}
        </Text>
      </View>
      <View>
        <FlatList
          data={flights.states}
          keyExtractor={({ index }) => index}
          renderItem={renderItem}
        />
        {/* <Text>{nextHour}</Text> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'lightgray',
    color: '#000',
    padding: 10,
    alignContent: 'stretch',
    textAlign: 'center',
  },
  container: {
    flex: 2,
    backgroundColor: '#fff',
    // justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: 400,
  },
  text: {
    color: 'white',
    backgroundColor: 'navy',
    textAlign: 'left',
    paddingLeft: 10,
  },
});

export default HomeScreen;
