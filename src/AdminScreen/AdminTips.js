import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Modal, View, Text, Button } from 'react-native'; // Import Button from react-native

import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity, StyleSheet, ScrollView } from 'react-native'; // Add ScrollView for the list of tips

const AdminTips = () => {
  const [tips, setTips] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState('');
  const [confirmDeleteTipId, setConfirmDeleteTipId] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    axios.get('http://localhost:3000/admin/tips')
      .then(response => {
        setTips(response.data.safety_tips);
      })
      .catch(error => {
        console.error('Error fetching tips:', error);
      });
  }, []);

  const openDeleteConfirmation = (tipId) => {
    setConfirmDeleteTipId(tipId);
  };

  const closeDeleteConfirmation = () => {
    setConfirmDeleteTipId(null);
  };

  const handleConfirmDelete = () => {
    // Send a request to delete the confirmed tip
    axios.delete(`http://localhost:3000/admin/tips/${confirmDeleteTipId}`)
      .then(response => {
        // Remove the deleted tip from the UI
        setTips(prevTips => prevTips.filter(tip => tip.tip_id !== confirmDeleteTipId));
        setDeleteMessage('Tip successfully deleted.');
        setTimeout(() => {
          setDeleteMessage('');
        }, 3000);
        closeDeleteConfirmation(); // Close the confirmation dialog
      })
      .catch(error => {
        console.error('Error deleting tip:', error);
        setDeleteMessage('Error deleting tip.');
        closeDeleteConfirmation(); // Close the confirmation dialog
      });
  };

  const handleBack = () => {
    console.log('Go back button clicked.');
    navigation.goBack();
  };



  const confirmationStyles = {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white', // Background color
      borderRadius: 10,
      margin: 20,
    },
    confirmationText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
    },
    button: {
      padding: 10,
      borderRadius: 5,
      width: '40%',
    },
  };
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
     
        <Text style={styles.headingText}>Submitted Safety Tips</Text>
        <FontAwesome name="exclamation-triangle" size={24} color="orange" style={styles.icon} />
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <FontAwesome name="arrow-left" size={24} color="blue" />
        </TouchableOpacity>
      </View>

      {deleteMessage && (
        <Text
          style={[
            styles.message,
            deleteMessage.includes('success') ? styles.success : styles.error,
          ]}
        >
          {deleteMessage}
        </Text>
      )}

      <ScrollView>
        {tips.map((tip) => (
          <View key={tip.tip_id} style={styles.tipContainer}>
            <View style={styles.tipBox}>
              <Text style={styles.tipDescription}>{tip.tip_description}</Text>
              <Text style={styles.tipDate}>
                {new Date(tip.date).toLocaleString()}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => openDeleteConfirmation(tip.tip_id)}
            >
              <FontAwesome name="trash" size={24} color="red" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <Modal
  transparent={true}
  visible={confirmDeleteTipId !== null}
  animationType="slide"
>
  <View style={confirmationStyles.container}>
    <Text style={confirmationStyles.confirmationText}>
      Are you sure you want to delete this tip?
    </Text>
    <View style={confirmationStyles.buttonContainer}>
      <Button
        title="Cancel"
        onPress={closeDeleteConfirmation}
        color="gray"
        style={confirmationStyles.button}
      />
      <Button
        title="Delete"
        onPress={handleConfirmDelete}
        color="red"
        style={confirmationStyles.button}
      />
    </View>
  </View>
</Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'grey',
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  message: {
    padding: 10,
    borderRadius: 5,
    fontWeight: 'bold',
  },
  success: {
    backgroundColor: 'lightgreen',
  },
  error: {
    backgroundColor: 'lightcoral',
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tipBox: {
    backgroundColor: 'lightgrey',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  tipDescription: {
    margin: 0,
  },
  tipDate: {
    margin: 0,
    fontSize: 12,
  },
  deleteButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
  },
  backButton: {
    marginLeft: 'auto',
  },
  modalContainer: {
    width: '80%', // Set the width as a percentage of the screen
    height: '50%', // Set the height as a percentage of the screen
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey', // Background color
  },
  confirmationText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default AdminTips;
