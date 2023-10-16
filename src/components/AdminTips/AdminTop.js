import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const AdminTop = ( { picture }) => {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>Admin</Text>
      <Image 
        height={50}
        width={50}
        resizeMode="contain"
        source={{
          uri: picture 
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 4,
    marginTop: 5
  },
  text: {
    fontWeight: '700',
    fontSize: 16,
  } 
})

export default AdminTop