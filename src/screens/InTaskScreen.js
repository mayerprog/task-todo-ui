import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { editTask } from "../redux/slices/taskSlice";
import { tasksAPI } from "../api/tasksAPI";

const InTaskScreen = ({ route, navigation }) => {
  const { task } = route.params;
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [buttonLoading, setButtonLoading] = useState(false);

  const dispatch = useDispatch();

  let updatedTask = {
    ...task,
  };

  const updateTask = async () => {
    setButtonLoading(true);
    updatedTask.title = title;
    updatedTask.description = description;
    console.log("updatedtask", updatedTask);
    dispatch(editTask(updatedTask));
    await tasksAPI.updateTask(task._id, updatedTask);
    navigation.goBack();
    setButtonLoading(false);
  };

  const [open, setOpen] = useState(false);

  // const handleOutsidePress = () => {
  //   Keyboard.dismiss();
  //   setOpen(false);
  // };

  return (
    // <TouchableWithoutFeedback onPress={handleOutsidePress}>
    <SafeAreaView style={styles.container} edges={["top", "right", "left"]}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 70,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View>
          <TextInput
            style={[
              styles.textStyle,
              { fontFamily: "Roboto-Medium", fontSize: 24 },
            ]}
            placeholder="Title"
            defaultValue={title}
            onChangeText={(taskTitle) => setTitle(taskTitle)}
          />

          <TextInput
            style={[styles.textStyle, { paddingHorizontal: 12 }]}
            multiline={true}
            maxLength={2000}
            placeholder="Description"
            defaultValue={description}
            onChangeText={(taskDescription) => setDescription(taskDescription)}
          />
        </View>

        <View style={[styles.contentContainer, { zIndex: 1000 }]}>
          <View style={{ marginTop: 15 }}></View>
        </View>

        <View
          style={{
            flexGrow: 1,
            flexDirection: "row",
            justifyContent: "space-around",
            paddingTop: 25,
            paddingBottom: 10,
          }}
        >
          <CustomButton
            label="Cancel"
            buttonStyle={styles.buttonStyle}
            textButtonStyle={styles.textButtonStyle}
            action={() => navigation.goBack()}
            underlayColor="#5884CD"
          />
          {buttonLoading ? (
            <ActivityIndicator size="large" color="#0000ff" style={{}} />
          ) : (
            <CustomButton
              label="Save"
              buttonStyle={[styles.buttonStyle, { backgroundColor: "#D1E0F9" }]}
              textButtonStyle={[styles.textButtonStyle, { color: "#5884CD" }]}
              underlayColor="#002594"
              action={updateTask}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
    // </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  textStyle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    paddingVertical: 13,
    alignSelf: "center",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-start",
    marginVertical: 10,
    minHeight: 160,
    maxHeight: "auto",
  },
  shadowedUnderline: {
    marginHorizontal: 15,
    borderWidth: 0.5,
    borderColor: "black",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    backgroundColor: "#0447B3",
  },
  labelText: {
    alignSelf: "center",
    color: "#6A6A6A",
    marginBottom: 5,
  },
  nothingAddedText: {
    alignSelf: "center",
    marginTop: 10,
  },
  buttonStyle: {
    width: 140,
    height: 45,
    backgroundColor: "#4676C5",
    paddingVertical: 13,
  },
  textButtonStyle: {
    fontSize: 16,
    fontFamily: "Lexend-Regular",
  },
  textInputStyle: {
    borderRadius: 30,
    width: 200,
  },
  dateInputStyle: {
    alignSelf: "center",
    marginTop: 25,
    marginBottom: 15,
    width: 380,
    borderColor: "black",
    backgroundColor: "white",
  },
});

export default InTaskScreen;
