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
import { ScrollView } from 'react-native-web';

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

  const welcomeMessage = `Welcome ${localStorage.getItem("citizen_name")}`;

  const fetchSafetyTips = () => {
    setLoading(true);
    axios
      .get("http://localhost:3006/safety_tip/")
      .then((response) => {
        // Sort the tips by date in descending order (newest first)
        const sortedTips = response.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setTips(sortedTips);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching safety tips");
        setLoading(false);
        console.error("Error fetching safety tips:", error);
      });
  };

  const handleAddTip = () => {
    var citizen_id = localStorage.getItem("citizen_id");

    var tip = { tip_description: tipText, citizen_id: Number(citizen_id) };

    if (!tipText) {
      setError('Tip text or citizen information is missing.');
      return;
    }

    setLoading(true);
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
/*gvgyvgyyyununini*/
  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString(); // Formats the date as per locale
  };

  return (
    <View style={styles.container}>
      <Heading />
      <Text style={styles.welcomeMessage}>{welcomeMessage}!</Text>

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
            <View>
              <View style={styles.commentContainer}>
                <Text style={styles.tipAndUser}>
                  <Text style={[styles.username, { textAlign: 'center' }]}>
                    {item.citizen_name}:
                  </Text>{' '}
                  <Text style={styles.tip} textAlign="center">
                    {item.tip_description}
                   
                  </Text>
                </Text>
              </View>
              <Text style={styles.date}>
                Date: {formatDate(item.date)}
              </Text>
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
        <ScrollView>
        <TextInput
          style={styles.input}
          placeholder="Enter your tip here"
          value={tipText}
          onChangeText={(text) => setTipText(text)}
          multiline
        />
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Pressable onPress={handleAddTip} style={styles.pressableButton}>
            <Text style={[styles.buttonText, { color: 'white', textAlign: 'center' }]}>Add Tip</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
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
    width: 260,
    borderRadius: 4,
    backgroundColor: "#D9D9D9",
    padding: 8,
    marginBottom: 8, // Add margin at the bottom
  },
  tipAndUser: {
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    fontWeight: 'bold',
    marginRight: 8,
    textAlign: 'center',
  },
  tip: {
    fontSize: 16,
    textAlign: "center",
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
    backgroundColor: "#D9D9D9",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    textAlign: "center",
  },
  buttonContainer: {
    width: 82,
    height: 28,
    backgroundColor: "black",
    alignSelf: "flex-end",
    borderRadius: 6,
  },
  date: {
    fontSize: 14,
    textAlign: 'center',
    color: '#777',
    marginLeft: 16,
  },  
  welcomeMessage: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: 16,
    marginTop: 16,
    marginBottom: 16,
  },
});

export default TipsPage;