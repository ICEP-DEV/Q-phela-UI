import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icons
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
const AdminTips = () => {
  const [tips, setTips] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState('');
  const navigation = useNavigation();  // Get the navigation object

  useEffect(() => {
    // Fetch tips from your API
    axios.get('http://localhost:3000/admin/tips')
      .then(response => {
        setTips(response.data.safety_tips);
      })
      .catch(error => {
        console.error('Error fetching tips:', error);
      });
  }, []);

  const handleDeleteTip = (tip_id) => {
    // Send a request to delete the tip
    axios.delete(`http://localhost:3000/admin/tips/${tip_id}`)
      .then(response => {
        console.log(response.data.message);
        // Remove the deleted tip from the UI
        setTips(prevTips => prevTips.filter(tip => tip.tip_id !== tip_id));
        setDeleteMessage('Tip successfully deleted.'); // Set the success message
        setTimeout(() => {
          setDeleteMessage(''); // Clear the success message after a few seconds
        }, 3000);
      })
      .catch(error => {
        console.error('Error deleting tip:', error);
        setDeleteMessage('Error deleting tip.'); // Set the error message
      });
  };

  const handleBack = () => {
   
    console.log('Go back button clicked.');
    // Add the logic to go back to the previous page
    navigation.goBack();  // Use navigation.goBack() here

  };

  return (
   
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.headingText}>Admin Tips</Text>
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
              onPress={() => handleDeleteTip(tip.tip_id)}
            >
              <Text style={styles.deleteButtonText}>Delete Tip</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    heading: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    headingText: {
      fontSize: 24,
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
    deleteButtonText: {
      color: 'white',
      textAlign: 'center',
    },
    backButton: {
      marginLeft: 'auto',
    },
  });

export default AdminTips;