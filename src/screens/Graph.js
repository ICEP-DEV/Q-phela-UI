import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,SafeAreaView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import axios from 'axios';
import Heading from '../components/landing-screen/Heading';
const screenWidth = Dimensions.get('window').width;
const screenHeight=Dimensions.get('window').height;
export default function Graph() {
  const [incidentType, setIncidentType] = useState([]);
  const [numPerCrime, setNumPerCrime] = useState([]);
  const [findLocation, setFindLocation] = useState('');
  const [isFound, setIsFound] = useState(false);
  const [showRatesLabel, setShowRatesLabel] = useState(false); // Add a state for the Rates label
  const api = 'http://localhost:3008/get_survey_summary_report/';
  const welcomeMessage = `HI ${localStorage.getItem("citizen_name")}`;
  useEffect(() => {
    axios.get(api + 'mabopaneTT').then(
      (res) => {
        console.log(res.data);
        const uniqueIncidentTypes = [...new Set(res.data.incident_types)];
        setIncidentType(uniqueIncidentTypes);
        setNumPerCrime(res.data.numper_per_incedences);
        setIsFound(res.data.success);
        if (res.data.success) {
          setShowRatesLabel(true); // Show the Rates label when the graph is displayed
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);
  const chartConfig = {
    backgroundGradientFrom: '#F0F0F0',
    barPercentage: 7.8,
    backgroundGradientFromOpacity: 0.8,
    backgroundGradientTo: 'white',
    backgroundGradientToOpacity: 0.8,
    color: (opacity = 1) => {
      const colors = ['black', 'darkgrey', 'lightgrey', 'grey', 'orange']; // Update the colors
      const colorIndex = Math.floor(colors.length * Math.random());
      return `${colors[colorIndex]}${Math.floor(opacity * 255).toString(16)}`;
    },
    strokeWidth: 2,
    barPercentage: 1,
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
        if (res.data.success) {
          setShowRatesLabel(true); // Show the Rates label when the graph is displayed
        } else {
          setShowRatesLabel(false); // Hide the Rates label when there's no data
        }
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
        colors: [(opacity = 1) =>'Orange',(opacity=1)=>'#2F9AAA',(opacity=1)=>'Yellow',(opacity=1)=>'Pink',(opacity=1)=>'purple' 
       
      ]
    }
      ]
   
   
  };
  let displayGraph = (
    <View style={styles.graphContainer} >
      <BarChart
        data={data}
        width={screenWidth * 0.8}
        height={300}
        chartConfig={chartConfig}
       verticalLabelRotation={50}
        showBarTops={false}
        showValuesOnTopOfBars={false}
        yAxisSuffix=""
        withInnerLines={false}
        withCustomBarColorFromData
        flatColor
        fromZero
        animation
     />
    </View >
  );
  return (
    <View style={styles.container}>
       <View style={styles.headingContainer}>
        <Heading />
     
      <Text style={styles.welcomeMessage}>{welcomeMessage}!</Text>
      </View>
      <View style={styles.ts}> 
     
      <TextInput
        style={styles.input}
        placeholder="Find HotSpot Location"
        onChangeText={(e) => setFindLocation(e)}
      />
      <TouchableOpacity style={styles.button} onPress={() => post()} >
        <Text style={styles.buttonText}>Find Location</Text>
        {showRatesLabel && (
          <View style={styles.yAxisLabelContainer}>
          </View>
        )}
      </TouchableOpacity>
      <View>
        {isFound === true && (
          <View style={styles.graphContainer}>
            {displayGraph}
            <Text style={{ textAlign: 'center', fontWeight: 'bold', marginTop: 10 }}>
              Incident Types.
            </Text>
            <Text style={{ transform: 'rotate(-90deg) translateY(-100%)', transformOrigin: 'left top', fontWeight: 'bold',textAlign: 'center',marginTop:19,marginRight:18}}>
  Number Of Crimes
</Text>

         <SafeAreaView style={{flex:1}}>
     
            <View style={styles.squareShape}/>


         </SafeAreaView>
          </View>
        )}
        {isFound === false && (
          <Text style={styles.errorMessage}>
            THE LOCATION ENTERED IS NOT CONSIDERED A DANGER ZONE! NO CRIMES REPORTED
          </Text>
        )}
      </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    width:400,
    height:400,

  },
  ts:{
   marginBottom:300,
   alignItems:'center',
   justifyContent:'center',
   
  },
  locationText: {
    marginLeft: 10,
    marginBottom: 10,
  },
  graphContainer: {
    width: screenWidth * 0.8,
    height: screenHeight * 5,
    backgroundColor: 'gray',
    flex: 30,
    marginTop: 16,
    elevation: 5,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    backgroundColor: 'lightgray',
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 5,
    paddingHorizontal: 10,
    alignContent:'center',
  },
  button: {
    backgroundColor:'black',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  squareShape:{
   width:20,
   height:20,
   backgroundColor:'Orange',
  },
  errorMessage: {
    color: 'red',
  },
  welcomeMessage: {
    fontSize: 24,
    fontWeight: 'bold',
    //textAlign: 'left',
    //marginLeft: 2,
    marginRight: 300,
    marginTop: 10,
    marginBottom: 10,
  },
  headingContainer: {
    position: 'absolute',
    top: 0, // Place it at the top
    right: 0, // Place it at the right
    //margin: 10,
    marginTop :10, // Add margin for spacing
    fontSize: 24,
     fontWeight: 'bold',
    //   //textAlign: 'left',
  },
});
