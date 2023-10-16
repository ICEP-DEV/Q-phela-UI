import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../assets/Colors";
import DeleteButton from "../global/DeleteButton";
import axios from "axios";

function deleteItemById (id, setTips, tips) {
  axios.delete(`http://192.168.107.1:8086/admin/tips/${id}`)
  .then(res => {
    setTips( tips.filter( x =>  {
      return x.tip_id != id;
    }))
  }).catch(er => {
    console.log(er)
  })
}

const TipItem = ({ item, setTips, tips }) => {
  return (
    <View style={styles.root}>
      <Text style={styles.title}> {item.citizen_name} </Text>
      <Text style={styles.desc}>{item.tip_description}</Text>
      <View style={styles.bott}>
        <Text style={{ alignItems: "flex-end" }}>{item.date} </Text>
      </View>
      <View style={styles.button}>
        <DeleteButton
          btnColor={Colors.black}
          title="Delete"
          onPressedFun={() => deleteItemById(item.tip_id, setTips, tips)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginBottom: 18,
  },
  title: {
    fontWeight: "800",
    marginBottom: 4,
  },
  desc: {
    backgroundColor: Colors.darkGray,
    borderRadius: 4,
    padding: 8,
    marginBottom: 10,
  },
  button: {
    marginTop: 8,
    alignSelf: "flex-end",
  },
  bott: {
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "flex-end",
  },
});

export default TipItem;

