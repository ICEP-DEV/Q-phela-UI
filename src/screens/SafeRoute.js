import react from "react";
import {Map} from "@googlemaps/react-wrapper";
import MapView from "react-native-maps";
import { SafeAreaView, StyleSheet, View , Dimensions } from "react-native";




const SafeRoute = () => {
    return(

        <SafeAreaView>
            <View style={styles.container}>
              <MapView style={styles.map} >
              latitude: 37.78825,
            longitude: -122.4324,
                latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
              </MapView>

            </View>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
    
        width: Dimensions.get('window'),
        height: Dimensions.get('window'),
    },
});		

export default SafeRoute;
