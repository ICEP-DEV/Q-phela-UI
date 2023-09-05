import React, { Component } from 'react';
import { View, StyleSheet, PermissionsAndroid } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
 

const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';

class SafeRouteMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLocation: null,
      recommendedRoute: [],
    };
  }

  componentDidMount() {
    this.requestLocationPermission();
  }

  requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app requires access to your location.',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.getCurrentLocation();
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        this.setState({ userLocation });
        this.calculateSafeRoute(userLocation);
      },
      (error) => {
        console.warn('Error getting location:', error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  calculateSafeRoute = (userLocation) => {

    const recommendedRoute = [
      { latitude: userLocation.latitude + 0.01, longitude: userLocation.longitude + 0.01 },
      { latitude: userLocation.latitude - 0.01, longitude: userLocation.longitude - 0.01 },
    ];
    this.setState({ recommendedRoute });
  };

  render() {
    const { userLocation, recommendedRoute } = this.state;

    return (
      <View style={styles.container}>
        {userLocation && (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          >
            <Marker coordinate={userLocation} title="Your Location" />
            <Polyline coordinates={recommendedRoute} strokeWidth={4} strokeColor="#00f" />
          </MapView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default SafeRouteMap;