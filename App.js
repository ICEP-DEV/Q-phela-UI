import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function App() {
  const [showMenuOptions, setShowMenuOptions] = useState(false);
  const [showWarningAlert, setShowWarningAlert] = useState(false);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log("Please grant location permissions");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      console.log("Location:");
      console.log(currentLocation);
    };
    getPermissions();
  }, []);

  const toggleMenuOptions = () => {
    setShowMenuOptions(!showMenuOptions);
  };

  const toggleWarningAlert = () => {
    setShowWarningAlert(!showWarningAlert);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuIcon} onPress={toggleMenuOptions}>
        <Text style={styles.menuText}>☰</Text>
      </TouchableOpacity>

      {showMenuOptions && (
        <View style={[styles.menuOptions, { zIndex: 1 }]}>
          <TouchableOpacity style={styles.menuOption}>
            <Text style={styles.menuOptionText}>Create Experiment</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuOption}>
            <Text style={styles.menuOptionText}>Create Tip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuOption}>
            <Text style={styles.menuOptionText}>View Hotspots</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuOption}>
            <Text style={styles.menuOptionText}>View Tips</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuOption}>
            <Text style={styles.menuOptionText}>Start a Trip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuOption}>
            <View style={styles.logoutContainer}>
              <Text style={styles.menuOptionText}>Logout</Text>
              <Icon name="sign-out" size={20} color="black" style={styles.logoutIcon} />
            </View>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.warning}>
        <Text style={styles.dangerLabel}>Danger Zone</Text>
      </View>

      <TouchableOpacity style={styles.warningMessage} onPress={toggleWarningAlert}>
        <View style={styles.warningTextContainer}>
          <Text style={styles.warningText}>
            You are in the danger zone. Please use the recommended alternative route.
          </Text>
          <View style={styles.warningIcon}>
            <Icon name="exclamation-triangle" size={30} color="yellow" />
          </View>
        </View>
      </TouchableOpacity>

      <Text style={styles.recommendedText}>Recommended</Text>

      <View style={styles.mapContainer}>
        {location && (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="Your Location"
              description="You are here"
            />
          </MapView>
        )}
      </View>

      <Modal visible={showWarningAlert} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>Warning</Text>
              <TouchableOpacity onPress={toggleWarningAlert}>
                <Icon name="times" size={20} color="black" style={styles.modalCloseIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.modalBody}>
              <View style={styles.warningIconModal}>
                <Icon name="exclamation-triangle" size={40} color="yellow" />
              </View>
              <Text style={styles.modalText}>
                You are in the danger zone. Please use the recommended alternative route.
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'white',
  },
  menuIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  menuText: {
    color: 'black',
    fontSize: 24,
  },
  warning: {
    position: 'absolute',
    top: 60,
    right: 10,
  },
  dangerLabel: {
    color: 'black',
    top: 130,
    right: 125,
    fontSize: 22,
  },
  warningMessage: {
    position: 'absolute',
    top: 230,
    left: 10,
    right: 10,
    alignItems: 'center',
  },
  warningTextContainer: {
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    padding: 10,
  },
  warningText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  warningIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recommendedText: {
    color: 'black',
    fontSize: 22,
    textAlign: 'center',
    top: 335,
  },
  mapContainer: {
    flex: 1,
    top: 350,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  map: {
    flex: 1,
    width: '100%',
  },
  menuOptions: {
    backgroundColor: 'lightgrey',
    position: 'absolute',
    top: 50,
    right: 10,
    width: 150,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
  menuOption: {
    padding: 10,
  },
  menuOptionText: {
    color: 'black',
    fontSize: 14,
  },
  logoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutIcon: {
    marginLeft: 10,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    width: '80%',
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalCloseIcon: {
    fontSize: 20,
  },
  modalBody: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  warningIconModal: {
    marginRight: 10,
  },
  modalText: {
    flex: 1,
  },
});
