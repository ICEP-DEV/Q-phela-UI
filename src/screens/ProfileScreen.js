// ProfileScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, FlatList, Animated } from 'react-native';
import Modal from 'react-native-modal';
import HomeScreen from './HomeScreen';

const ProfileScreen = () => {
  const [name, setName] = useState('John Doe');
  const [username, setUsername] = useState('johndoe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [isEditing, setIsEditing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const animatedValue = new Animated.Value(0);

  const animateText = () => {
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000, // Increase the size in 1 second
        useNativeDriver: false,
      }),
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 1000, // Decrease the size in 1 second
        useNativeDriver: false,
      }),
    ]).start();
  };

  const saveChanges = () => {
    setIsEditing(false);
    setIsModalVisible(true);
    animateText(); // Start the animation when saving changes
    // You can implement code here to save the edited details to your backend or storage.
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const data = [
    { label: 'Name', value: name },
    { label: 'Username', value: username },
    { label: 'Email', value: email },
  ];

  return (
    <View style={styles.container}>
      <Image
        //source={require('./profile.jpg')} // Your profile picture
        style={styles.profileImage}
      />
      <FlatList
        data={data}
        keyExtractor={(item) => item.label}
        renderItem={({ item }) => (
          <View style={styles.infoRow}>
            <Text style={styles.label}>{item.label}:</Text>
            {isEditing ? (
              <TextInput
                style={styles.editInput}
                value={item.value}
                onChangeText={(text) => {
                  if (item.label === 'Name') setName(text);
                  if (item.label === 'Username') setUsername(text);
                  if (item.label === 'Email') setEmail(text);
                }}
                placeholder={`Enter ${item.label}`}
                placeholderTextColor="grey"
              />
            ) : (
              <Animated.Text style={[styles.value, { fontSize: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [16, 20], // Change the font size during the animation
              }) }]}>{item.value}</Animated.Text>
            )}
          </View>
        )}
      />
      {isEditing ? (
        <TouchableOpacity style={styles.editButton} onPress={saveChanges}>
          <Text style={styles.editButtonText}>Save Changes</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsEditing(true)}
        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      )}
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Profile Updated</Text>
          <TouchableOpacity onPress={closeModal}>
            <Text style={styles.closeModalText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <HomeScreen/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#cae7d3',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
    padding: 10,
    borderRadius: 5,
  },
  label: {
    width: 100,
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    flex: 1,
    fontSize: 16,
    color: 'gray',
  },
  editInput: {
    flex: 1,
    height: 40,
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    color: 'grey',
  },
  editButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginBottom:50,
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20,
  },
  closeModalText: {
    color: 'blue',
    marginTop: 10,
  },
});

export default ProfileScreen;
