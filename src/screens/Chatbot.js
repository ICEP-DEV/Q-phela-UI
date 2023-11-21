import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, ActivityIndicator, Switch } from 'react-native';
import * as Speech from 'expo-speech';
import HomeScreen from './HomeScreen';
const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  useEffect(() => {
    // Initial welcome message
    setMessages([{ id: 1, text: <Text style={{ fontWeight: 'bold', fontSize:15, justifyContent:'center'}}>ASK AND GET HELP</Text> }]);
  }, []);
  const handleUserInput = () => {
    // Process user input and generate bot response
    const userInput = inputText.toLowerCase(); // Convert input to lowercase
    setLoading(true);
    setTimeout(() => {
        let response;
        if (userInput.includes('busy')) {
          response = "When in a busy area, stay alert and be aware of your surroundings. Avoid displaying valuable items.";
        } else if (userInput.includes('gbv')) {
          response = "Report Gender-Based Violence by contacting local law enforcement, seeking medical attention, and reaching out to support organizations or hotlines.";
        } else if (userInput.includes('hi')) {
          response = "HI hello   Welcome to Qphela  Chat bot. How can I help you?";
        } else if (userInput.includes('overcrowded')) {
          response = "In overcrowded areas, keep your belongings secure and avoid crowded places if possible.";
        } else if (userInput.includes('quiet')) {
          response = "In quiet areas, be cautious and avoid isolated spots. Let someone know your whereabouts.";
        } else if (userInput.includes('public transport')) {
          response = "When using public transport, be aware of your surroundings, travel in well-lit areas, and keep your belongings secure.";
        } else if (userInput.includes('night')) {
          response = "At night, stay in well-lit areas, use trusted transportation, and be cautious of your surroundings.";
        } else if (userInput.includes('stranger')) {
          response = "Avoid sharing personal information with strangers and be cautious when approached by unfamiliar individuals.";
        } else if (userInput.includes('emergency')) {
          response = "Save emergency contacts on your phone, and know the emergency hotline number in your area for quick response.";
        } else if (userInput.includes('self-defense')) {
          response = "Consider taking self-defense classes to empower yourself and enhance your personal safety.";
        } else if (userInput.includes('online')) {
          response = "When online, be cautious about sharing personal information and report any suspicious activity to the platform.";
        } else if (userInput.includes('traffic rules')) {
          response = "Follow traffic rules and use designated crosswalks to ensure your safety when crossing roads.";
        } else if (userInput.includes('atm')) {
          response = "When using ATMs, be cautious of your surroundings, shield your PIN, and avoid displaying large sums of money.";
        } else if (userInput.includes('parking')) {
          response = "Park in well-lit areas, lock your car, and avoid leaving valuables visible to reduce the risk of theft.";
        } else if (userInput.includes('cybersecurity')) {
          response = "Practice good cybersecurity habits, such as using strong passwords and being cautious of phishing attempts, to protect your online presence.";
        } else if (userInput.includes('traveling alone')) {
          response = "When traveling alone, inform someone of your itinerary, stay in reputable accommodations, and be cautious in unfamiliar areas.";
        } else if (userInput.includes('social gatherings')) {
          response = "In social gatherings, be mindful of your drink, stay with trusted friends, and have a plan for getting home safely.";
        } else if (userInput.includes('children safety')) {
          response = "Ensure children's safety by teaching them about stranger danger, setting boundaries, and monitoring their online activities.";
        } else if (userInput.includes('workplace safety')) {
          response = "Promote workplace safety by reporting any unsafe conditions, participating in safety training, and being aware of emergency exits.";
        } else if (userInput.includes('traumatized')) {
          response = "Prioritize mental health by seeking support when needed, practicing self-care, and promoting a healthy work-life balance.";
        } else if (userInput.includes('home security')) {
          response = "Enhance home security by installing reliable locks, securing windows, and being cautious of who you allow into your home.";
        } else if (userInput.includes('environmental awareness')) {
          response = "Practice environmental awareness by disposing of waste responsibly and being mindful of your impact on the surroundings.";
        } else if (userInput.includes('avoiding theft')) {
          response = "To avoid theft, keep your belongings secure, be aware of your surroundings, and use anti-theft measures such as locking your bags.";
        } else if (userInput.includes('gun violence')) {
          response = "To stay safe from gun violence, avoid confrontations, report suspicious activity to the authorities, and follow safety guidelines in your area.";
        } else if (userInput.includes('sexual assault')) {
          response = "To prevent sexual assault, trust your instincts, be cautious in unfamiliar environments, and seek help if you feel unsafe.";
        } else if (userInput.includes('carjacking')) {
          response = "To reduce the risk of carjacking, be aware of your surroundings, keep your car doors locked, and avoid stopping in isolated or poorly lit areas.";
        } else {
          response = "I'm sorry, I didn't understand. Please select a keyword: busy, GBV, overcrowded, quiet, public transport, night, stranger, emergency, self-defense, online, traffic rules, ATM, parking, cybersecurity, traveling alone, social gatherings, children safety, workplace safety, mental health, home security, or environmental awareness.";
          showSuggestionMenu();
        }
      // Update chat history
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, text: userInput },
        { id: prevMessages.length + 2, text: response },
      ]);
      // Speak the response if voice is enabled
      if (voiceEnabled) {
        Speech.speak(response, { language: 'en' });
      }
      // Send the new message to the server
      fetch('http://localhost:3000/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_input: userInput,
          bot_response: response,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Message sent to the server:', data);
        })
        .catch((error) => {
          console.error('Error sending message to the server:', error);
          Alert.alert('Error', 'Failed to send message to the server. Please try again.');
        })
        .finally(() => {
          setLoading(false);
          // Clear the input text after sending the message
          setInputText('');
        });
    }, 1000); // Simulating a delay for the bot to process the input
  };
  const showSuggestionMenu = () => {
    Alert.alert(
      "Select a Keyword",
      "Choose a keyword related to your safety concern:",
      [
        { text: "Busy", onPress: () => setInputText("busy") },
        { text: "GBV", onPress: () => setInputText("GBV") },
        { text: "Overcrowded", onPress: () => setInputText("overcrowded") },
        // Add more suggestions based on your needs
      ],
      { cancelable: true }
    );
  };
  return (
    <View style={{ flex: 1 ,backgroundColor:'#cae7d3'}}> 
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, backgroundColor: item.id % 2 === 0 ? '#ADD8E6' : '#cae7d3' }}>
             <Text style={{ fontWeight: 'bold',textAlign:'center' }}>{item.text}</Text>
            
          </View>
        )}
      />
      {loading ? (
        <ActivityIndicator style={{ margin: 10 }} size="large" color="#4CAF50"  />       ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
          <TextInput
            style={{ flex: 1, height: 40, borderColor: '#808080', borderWidth: 1, marginRight: 10, padding: 5,marginBottom:20}}
            placeholder="Type your message..."
            value={inputText}
            onChangeText={(text) => setInputText(text)}/>
          <Switch
            value={voiceEnabled}
            onValueChange={(value) => setVoiceEnabled(value)}
            style={{ marginRight: 10,marginBottom:20}}
          />
          <TouchableOpacity style={{ padding: 10, backgroundColor: '#000000', borderRadius: 5,marginBottom:20}} onPress={handleUserInput}>
            <Text style={{ color: 'white' }}>Send</Text>
          </TouchableOpacity>
          
        </View>
      )}
      <View>
      <HomeScreen/>
      </View>
    </View>
    
  );
};
export default Chatbot;