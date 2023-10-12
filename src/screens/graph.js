import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { useEffect, useState } from 'react';
import axios from 'axios';
const screenWidth = Dimensions.get("window").width;



export default function graph() {
    let [Incident_type, setIncident_type] = useState([])
    let [Num_per_crime, setNum_per_crime] = useState([])
    let [Findlocation, setFindlocation] = useState("")
    let [IsFound,setIsFound] = useState(false)

    const api = "http://localhost:3000/get_survey_summary_report/"
    useEffect(() => {
        axios.get(api + "mabopaneTT").then(res => {
            console.log(res.data)
            setIncident_type(res.data.incident_types)
            setNum_per_crime(res.data.numper_per_incedences)
            setIsFound(res.data.success)
        }, err => {
            console.log(err)
        })
    }, [])

    
    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `#0e1aff`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    function post() {
        console.log(Findlocation)
        axios.get(api+Findlocation).then(res => {
             console.log(res.data)
             setIncident_type(res.data.incident_types)
             setNum_per_crime(res.data.numper_per_incedences)
             setIsFound(res.data.success)
         }, err => {
             console.log(err)
         })
 
    }

    const data = {
        labels: Incident_type,
        datasets: [
            {
                data: Num_per_crime
            }
        ]
    };

    let displayGraph = <View>
        <BarChart
                    style={styles.graphStyle}
                    data={data}
                    width={screenWidth}
                    height={220}
                    chartConfig={chartConfig}
                    verticalLabelRotation={30}
                />
    </View>
    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Find HotSport_location"
                mode="text"
                secure={true}
                onChangeText={(e) => setFindlocation(e)}
            />
            <Pressable onPress={() =>post()}>
                <Text style={styles.text}>
                    find location
                </Text>
            </Pressable>
               
            <View>
              {(IsFound === true) && (<View>{displayGraph}</View>)}  
                {(IsFound === false) && (<Text>THE LOCATION ENTERED IS NOT CONSIDERED A DANGER ZONE ! NO CRIMES REPORTED </Text>)} 
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
    graphStyle: {
        color: "blue"
    },
    text: {
        fontSize: 14,
        fontWeight: "400",
    },
});
