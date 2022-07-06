import { Text, View, ScrollView, Button, FlatList } from 'react-native';
import { fetchFlights } from './features/flights/flightsSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const HomeScreen = () => {
  const hours = new Date().getHours();
  const minutes = new Date().getMinutes();
  const curTime = `${hours}: ${minutes}`;
  const flights = useSelector((state) => state.flights.flightsArray);
  console.log('flights', flights);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchFlights());
  // }, []);

  return (
    <View style={{ paddingTop: 60, paddingLeft: 0 }}>
      <Text
        style={{
          fontSize: 30,
          backgroundColor: 'navy',
          color: 'white',
          textAlign: 'center',
        }}
      >
        Current Time: {curTime}
      </Text>
      <Button
        title='Find Wide-Body Aircraft Near You'
        color='forestgreen'
        onPress={() => dispatch(fetchFlights())}
      />
      <Text
        style={{
          textAlign: 'center',
          backgroundColor: 'navy',
          color: 'white',
        }}
      >
        Number of Flights Scheduled to arrive in the next hour: {flights.length}
      </Text>
      <FlatList
        data={flights}
        keyExtractor={({ index }) => index}
        renderItem={({ item }) => (
          <Text style={{ fontSize: 40 }}>
            From: {item.estDepartureAirport ?? 'N/A'}
          </Text>
        )}
      />
      {/* <Text>{nextHour}</Text> */}
    </View>
  );
};

export default HomeScreen;
