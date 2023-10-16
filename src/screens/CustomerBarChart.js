// import React from 'react';
// import { View, StyleSheet, Text } from 'react-native';
// import { BarChart } from 'react-native-chart-kit';
// import Heading from '../components/landing-screen/Heading';

// const data = {
//   labels: ['Robbery', 'Car Jacking', 'Kidnapping', 'Others'],
//   datasets: [
//     {
//       data: [20, 45, 28, 50],
//     },
//   ],
// };

// const CustomerBarChart = () => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Heading />
//       </View>
//       <BarChart
//         data={data}
//         width={300}
//         height={200}
//         yAxisSuffix="n"
//         fromZero={true}
//         chartConfig={{
//           backgroundGradientFrom: '#ffffff',
//           backgroundGradientTo: '#ffffff',
//           color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//         }}
//         style={{ marginVertical: 8 }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   header: {
//     position: 'absolute',
//     top: 20, // Adjust this value to control the distance from the top
//     right: 20, // Adjust this value to control the distance from the right
//   },
// });

// export default CustomerBarChart;
