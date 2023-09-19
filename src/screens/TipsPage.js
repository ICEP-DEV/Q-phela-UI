import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import Heading from '../components/landing-screen/Heading';

const API_BASE_URL = 'http://localhost:3006';

const TipsPage = ({ citizen }) => {
  const [tipText, setTipText] = useState('');
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch safety tips when the component mounts
    fetchSafetyTips();
    
  }, []);

  const fetchSafetyTips = () => {
    setLoading(true);
    axios
      .get("http://localhost:3006/safety_tip/")
      .then((response) => {
        setTips(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching safety tips");
        setLoading(false);
        console.error("Error fetching safety tips:", error);
      });
  };
 
  
  const handleAddTip = () => {
    var citizen_id=localStorage.getItem("citizen_id")

    var tip={tip_description:tipText, citizen_id:Number(citizen_id)}
    
    if (!tipText) {
      setError('Tip text or citizen information is missing.');
      return;
    }

    setLoading(true);
    //const newTip = { tip_description: tipText, citizen_id: citizen.citizen_id };
    axios
      .post(`${API_BASE_URL}/safety_tip`, tip, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('Tip added successfully:', response.data);
        fetchSafetyTips();
        setTipText('');
        setError(null);
      })
      .catch((error) => {
        setError('Error adding safety tip');
        console.error('Error adding safety tip:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Heading />
      <Text style={styles.listTitle} textAlign="center">
        Alert Community
      </Text>
      {loading ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        <FlatList
          data={tips}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.commentContainer}>
              <Text style={styles.tipAndUser}>
                <Text style={[styles.username, { textAlign: 'center' }]}>
                  {item.citizen_name}:
                </Text>{' '}
                <Text style={styles.tip} textAlign="center">
                  {item.tip_description}
                </Text>
              </Text>
              <Text style={styles.date}>{`Date: ${formatDate(item.date)}`}</Text>
            </View>
          )}
          ListEmptyComponent={() => (
            <Text style={[styles.emptyList, { textAlign: 'center' }]}>
              No tips yet
            </Text>
          )}
        />
      )}
      {error && (
        <Text style={[styles.errorText, { textAlign: 'center' }]}>{error}</Text>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your tip here"
          value={tipText}
          onChangeText={(text) => setTipText(text)}
          multiline
        />
        <View style={styles.buttonContainer}>
          <Pressable onPress={handleAddTip} style={styles.pressableButton}>
            <Text style={styles.buttonText}>Add Tip</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const formatDate = (dateString) => {
  const dateObj = new Date(dateString);
  return dateObj.toLocaleDateString(); // Formats the date as per locale
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    elevation: 12, // Add a shadow with a depth of 12
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center", // Center-align the text
  },
  commentContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  tipAndUser: {
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    fontWeight: "bold",
    marginRight: 8,
    textAlign: "center", // Center-align the text
  },
  tip: {
    fontSize: 16,
    textAlign: "center", // Center-align the text
  },
  emptyList: {
    fontSize: 16,
    color: "#777",
   
  },
  inputContainer: {
    flexDirection: "column",
    alignItems: "stretch",
    marginTop: 16,
  },
  input: {
    width: 363,
    height: 51,
    marginBottom: 8,
    backgroundColor: "#D9D9D9", // Set the background color to light grey
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6, // Set the corner radius to 6
    padding: 8,
    textAlign: "center", // Center-align the text
  },
  buttonContainer: {
    width: 82,
    height: 28,
    alignSelf: "flex-end", // Align the button to the right
    borderRadius: 6, // Set the corner radius of the button to 6
  },
  date: {
    fontSize: 14,
    textAlign: 'left',
    color: '#777',
  },
});

export default TipsPage;