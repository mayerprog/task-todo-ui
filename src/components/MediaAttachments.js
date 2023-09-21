import React, { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const MediaAttachments = () => {
  const [cameraPressed, setCameraPressed] = useState(false);
  const [linkPressed, setLinkPressed] = useState(false);

  return (
    <View>
      {cameraPressed && (
        <View style={[styles.container, { marginBottom: 25, marginTop: 25 }]}>
          <Pressable
            hitSlop={10}
            style={({ pressed }) => [
              styles.pressableContainer,
              { backgroundColor: pressed ? "#21A098" : "#1B57B8" },
            ]}
          >
            {({ pressed }) => (
              <Image
                source={require("../assets/images/camera-in-container.png")}
                style={[
                  { tintColor: pressed ? "white" : "black" },
                  { height: 23, width: 23 },
                ]}
              />
            )}
          </Pressable>
          <Pressable
            hitSlop={10}
            style={({ pressed }) => [
              styles.pressableContainer,
              { backgroundColor: pressed ? "#21A098" : "#1B57B8" },
            ]}
          >
            {({ pressed }) => (
              <Image
                source={require("../assets/images/photo-in-container.png")}
                style={[
                  { tintColor: pressed ? "white" : "black" },
                  { height: 23, width: 23 },
                ]}
              />
            )}
          </Pressable>
          <Pressable
            hitSlop={10}
            style={({ pressed }) => [
              styles.pressableContainer,
              { backgroundColor: pressed ? "#21A098" : "#1B57B8" },
            ]}
          >
            {({ pressed }) => (
              <Image
                source={require("../assets/images/doc-in-container.png")}
                style={[
                  { tintColor: pressed ? "white" : "black" },
                  { height: 23, width: 23 },
                ]}
              />
            )}
          </Pressable>
        </View>
      )}
      {linkPressed && (
        <View style={{ alignItems: "center", marginTop: 15 }}>
          <TextInput
            style={styles.textInput}
            placeholder="Link name"
            placeholderTextColor="#ccc"
            onChangeText={() => console.log("clicked")}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Link"
            placeholderTextColor="#ccc"
            onChangeText={() => console.log("clicked")}
          />
        </View>
      )}

      <View style={styles.container}>
        <Pressable
          hitSlop={10}
          onPress={() => setCameraPressed(!cameraPressed)}
        >
          <Image
            source={require("../assets/images/camera.png")}
            style={[
              { tintColor: cameraPressed ? "#21A098" : "black" },
              { height: 45, width: 45 },
            ]}
          />
        </Pressable>

        {/* задизейблить одну кнопку, пока работает другая */}

        <Pressable hitSlop={10} onPress={() => setLinkPressed(!linkPressed)}>
          <Image
            source={require("../assets/images/link.png")}
            style={[
              { tintColor: linkPressed ? "#21A098" : "black" },
              { height: 40, width: 40 },
            ]}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 20,
  },
  pressableContainer: {
    width: 80,
    height: 50,
    paddingHorizontal: 28,
    paddingVertical: 13,
    borderRadius: 25,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#1B57B8",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  textInput: {
    fontSize: 16,
    fontFamily: "Lexend-Regular",
    borderWidth: 1,
    borderColor: "#A1A1A1",
    backgroundColor: "white",
    width: 380,
    paddingLeft: 15,
    height: 45,
    marginBottom: 5,
  },
});

export default MediaAttachments;
