import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import Heading from '../components/landing-screen/Heading';
import { FontAwesome } from '@expo/vector-icons';

const API_BASE_URL = 'http://localhost:3006';

const TipsPage = ({ citizen }) => {
  const [tipText, setTipText] = useState('');
  const [tips, setTips] = useState([]);
  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch safety tips when the component mounts
    fetchSafetyTips();
  }, []);

  const welcomeMessage = `Welcome ${localStorage.getItem('citizen_name')}`;

  const fetchSafetyTips = () => {
    setLoading(true);
    axios
      .get('http://localhost:3006/safety_tip/')
      .then((response) => {
        // Sort the tips by date in descending order (newest first)
        const sortedTips = response.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setTips(sortedTips);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching safety tips');
        setLoading(false);
        console.error('Error fetching safety tips:', error);
      });
  };

  const handleAddTip = () => {
    var citizen_id = localStorage.getItem('citizen_id');

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

  const handleLike = (index) => {
    const updatedTips = [...tips];
    if (updatedTips[index].liked === true) {
      updatedTips[index].liked = null; // Remove the like
    } else {
      updatedTips[index].liked = true; // Set to like
    }
    setTips(updatedTips);
  };

  const handleDislike = (index) => {
    const updatedTips = [...tips];
    if (updatedTips[index].liked === false) {
      updatedTips[index].liked = null; // Remove the dislike
    } else {
      updatedTips[index].liked = false; // Set to dislike
    }
    setTips(updatedTips);
  };

  const renderLikeDislikeButtons = (index, liked) => {
    if (liked === true) {
      return (
        <View style={styles.thumbsContainer}>
          <TouchableOpacity onPress={() => handleLike(index)}>
            <FontAwesome name="thumbs-up" size={24} color="blue" />
          </TouchableOpacity>
        </View>
      );
    } else if (liked === false) {
      return (
        <View style={styles.thumbsContainer}>
          <TouchableOpacity onPress={() => handleDislike(index)}>
            <FontAwesome name="thumbs-down" size={24} color="red" />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.thumbsContainer}>
          <TouchableOpacity onPress={() => handleLike(index)}>
            <FontAwesome name="thumbs-up" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDislike(index)}>
            <FontAwesome name="thumbs-down" size={24} color="black" />
          </TouchableOpacity>
        </View>
      );
    }
  };

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
          renderItem={({ item, index }) => (
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
                <View style={styles.thumbsContainer}>
                  {renderLikeDislikeButtons(index, item.liked)}
                  <Text style={styles.likeDislikeCounts}>
                    Likes: {item.likes} Dislikes: {item.dislikes}
                  </Text>
                </View>
                <Text style={styles.date}>{formatDate(item.date)}</Text>
              </View>
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
            <Text style={[styles.buttonText, { color: 'white', textAlign: 'center' }]}>
              Add Tip
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // ... (previous styles)

  likeDislikeCounts: {
    fontSize: 14,
    color: '#777',
    marginLeft: 8,
  },




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
    backgroundColor: "#D9D9D9", // Set the background color to grey
    borderWidth: 1,
    borderColor: "#ccc",
    flexDirection: 'row', // Make comments display in a row layout
    alignItems: "center",
    padding: 8,
    marginBottom: 8,
    justifyContent: 'space-between', // Space items evenly along the horizontal axis
    position: 'relative',
  },
  tipAndUser: {
    flex: 1, // Allow the text to take up all available space
    alignItems: "center",
  },
  thumbsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 8,
  },
  thumbsIcon: {
    marginBottom: 8, // Adjust the spacing between thumbs
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
    //padding: 8,
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
    position: 'absolute',
    right: 8,
    bottom: 8,
    fontSize: 14,
    color: '#777',
  },
  welcomeMessage: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  thumbsIcon: {
    marginRight: 8, // Adjust the spacing
  },
});

export default TipsPage;