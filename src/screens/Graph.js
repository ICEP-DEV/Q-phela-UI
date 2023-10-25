import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import axios from 'axios';
import Heading from '../components/landing-screen/Heading';

const screenWidth = Dimensions.get('window').width;

export default function Graph() {
  const [incidentType, setIncidentType] = useState([]);
  const [numPerCrime, setNumPerCrime] = useState([]);
  const [findLocation, setFindLocation] = useState('');
  const [isFound, setIsFound] = useState(false);

  const api = 'http://localhost:3008/get_survey_summary_report/';
  const welcomeMessage = `HI ${localStorage.getItem("citizen_name")}`;

  useEffect(() => {
    axios.get(api + 'mabopaneTT').then(
      (res) => {
        console.log(res.data);
        // Remove duplicates from incident types using Set
        const uniqueIncidentTypes = [...new Set(res.data.incident_types)];
        setIncidentType(uniqueIncidentTypes);
        setNumPerCrime(res.data.numper_per_incedences);
        setIsFound(res.data.success);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  const chartConfig = {
    backgroundGradientFrom: '#f0f0f0',
    barPercentage: 7.8,
    backgroundGradientFromOpacity: 0.8,
    backgroundGradientTo: 'white',
    backgroundGradientToOpacity: 0.8,
    color: (opacity = 1) => {
    const colors = ['#007BFF', '#34C759', '#FFD60A', '#FF453A', '#7950F2']; // Define your custom colors
    const colorIndex = Math.floor(colors.length * Math.random()); // Randomly select a color from the array
    return `${colors[colorIndex]}${Math.floor(opacity * 255).toString(16)}`; // Apply the color with opacity
    },
    strokeWidth: 2,
    barPercentage: 0.7,
    useShadowColorFromDataset: false,
    fillShadowGradient: 'rgba(0, 123, 255, 0.4)',
    fillShadowGradientOpacity: 0.4,
    decimalPlaces: 0,
    propsForLabels: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#007BFF',
    },
  };

  function post() {
    console.log(findLocation);
    axios.get(api + findLocation).then(
      (res) => {
        console.log(res.data);
        setIncidentType(res.data.incident_types);
        setNumPerCrime(res.data.numper_per_incedences);
        setIsFound(res.data.success);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  const data = {
  labels: incidentType,
  datasets: [
    {
      data: numPerCrime,
      color: (opacity = 1) => {
        // Define individual colors for each bar
        const colors = ['#007BFF', '#34C759', '#FFD60A', '#FF453A', '#7950F2'];
       return `${colors[numPerCrime.indexOf(opacity)]}${Math.floor(opacity * 255).toString(16)}`;
      },
    },
  ],
};


  let displayGraph = (
    <View style={styles.graphContainer}>
      <BarChart
        data={data}
        width={screenWidth}
        height={260}
        chartConfig={chartConfig}
        verticalLabelRotation={1}
        showBarTops
        showValuesOnTopOfBars
        yAxisSuffix=""
        withInnerLines
        fromZero
        animation
      />
    </View>
  );

  return (
    <View style={styles.container}>
          <Heading style={styles.heading}>Hi {localStorage.getItem("citizen_name")}!</Heading>
      <Text style={styles.locationText}>
       <p>
       </p>

       <p>

        
       </p>
        {/* You are viewing results for {findLocation} */}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Find HotSpot Location"
        onChangeText={(e) => setFindLocation(e)}
      />
      <TouchableOpacity style={styles.button} onPress={() => post()}>
        <Text style={styles.buttonText}>Find Location</Text>
      </TouchableOpacity>
      <View>
        {isFound === true && <View>{displayGraph}</View>}
        {isFound === false && (
          <Text style={styles.errorMessage}>
            THE LOCATION ENTERED IS NOT CONSIDERED A DANGER ZONE! NO CRIMES REPORTED
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationText: {
    marginLeft: 10,
    marginBottom: 10,
  },
  graphContainer: {
    marginVertical: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
    elevation: 5,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  errorMessage: {
    color: 'red',
  },
});
