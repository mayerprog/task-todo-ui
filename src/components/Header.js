import React from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import listIcon from "../assets/images/list.png";

const Header = () => {
  const dispatch = useDispatch();

  return (
    <View>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Image source={listIcon} style={styles.doneImg} />
        </View>
        <Text style={styles.headerText}>
          Tasks
          {"\n"}
          To Do
        </Text>
      </View>

      <View style={styles.line}>
        <View style={styles.linesStyle} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-around",
  },
  headerText: {
    fontSize: 15,
    color: "white",
    alignSelf: "center",
    fontFamily: "Poppins-Bold",
  },
  doneImg: {
    height: 50,
    width: 50,
    marginEnd: 10,
    marginVertical: 10,
  },
  line: {
    flexDirection: "row",
    alignItems: "stretch",
    paddingTop: 2,
  },
  linesStyle: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
});

export default Header;
