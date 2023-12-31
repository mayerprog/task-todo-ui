import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { addTasks } from "../redux/slices/taskSlice";

import CustomButton from "../components/CustomButton";
import { tasksAPI } from "../api/tasksAPI";

import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Checkbox from "expo-checkbox";

const NewTaskScreen = ({ setModalVisible }) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isImportant, setIsImportant] = useState(false);

  const dispatch = useDispatch();

  async function createTask() {
    if (title.trim().length === 0) {
      Alert.alert("Please add title");
      return;
    } else if (description.trim().length === 0) {
      Alert.alert("Please add description");
      return;
    } else {
      setLoading(true);
      const newSavedTask = await tasksAPI.createTask(
        title,
        description,
        isImportant,
        false
      );
      dispatch(addTasks(newSavedTask));
      setModalVisible(false);
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={styles.scrollContainer}
        automaticallyAdjustKeyboardInsets={true}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={{ top: 15 }}>
            <View>
              <Text style={styles.header}>New Task</Text>
              <View style={styles.underLine} />
            </View>

            <View>
              <Text style={styles.text}>Task Title</Text>
              <TextInput
                style={[styles.textInput, { height: 50 }]}
                placeholder="Name the task"
                placeholderTextColor="#ccc"
                value={title}
                onChangeText={(taskTitle) => setTitle(taskTitle)}
              />
            </View>

            <View>
              <Text style={styles.text}>Description</Text>
              <TextInput
                style={[styles.textInput, { height: 150, paddingTop: 10 }]}
                maxLength={2000}
                multiline={true}
                placeholder="Add description..."
                placeholderTextColor="#ccc"
                value={description}
                onChangeText={(taskDescription) =>
                  setDescription(taskDescription)
                }
              />
            </View>

            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "flex-start",
                margin: 10,
              }}
            >
              <Checkbox
                style={{ margin: 8 }}
                value={isImportant}
                onValueChange={setIsImportant}
                color={isImportant ? "#A94700" : undefined}
                hitSlop={15}
              />
              <Text style={styles.text}>Important</Text>
            </View>

            <View style={styles.shadowedUnderline} />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                paddingVertical: 13,
              }}
            >
              <CustomButton
                label="Cancel"
                buttonStyle={styles.buttonStyle}
                textButtonStyle={styles.textButtonStyle}
                action={() => setModalVisible(false)}
                underlayColor="#5884CD"
              />
              {loading ? (
                <ActivityIndicator
                  size="large"
                  color="#fff"
                  style={{ alignSelf: "center" }}
                />
              ) : (
                <CustomButton
                  label="Create"
                  buttonStyle={[
                    styles.buttonStyle,
                    { backgroundColor: "#DB5C00" },
                  ]}
                  textButtonStyle={styles.textButtonStyle}
                  underlayColor="#5884CD"
                  action={createTask}
                />
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  scrollContainer: {
    flex: 1,
    opacity: 0.8,
    backgroundColor: "#782666",
  },
  line: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  linesStyle: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
    shadowOpacity: 0.9,
    shadowRadius: 4,
    shadowOffset: {
      height: 7,
      width: 0,
    },
  },
  header: {
    fontFamily: "Lexend-SemiBold",
    alignSelf: "center",
    fontSize: 21,
    color: "#fff",
  },
  underLine: {
    borderWidth: 1,
    alignSelf: "center",
    borderColor: "#ccc",
    margin: 15,
    marginTop: 9,
    width: 250,
  },
  text: {
    fontSize: 15,
    fontFamily: "Lexend-Medium",
    color: "white",
    marginLeft: 13,
    marginBottom: -3,
  },
  textInput: {
    fontSize: 16,
    fontFamily: "Lexend-Regular",
    borderWidth: 1,
    borderColor: "#A1A1A1",
    backgroundColor: "white",
    borderRadius: 12,
    width: 380,
    paddingLeft: 15,
    margin: 13,
  },
  buttonStyle: {
    width: 140,
    height: 45,
    backgroundColor: "#A94700",
    paddingVertical: 13,
  },
  textButtonStyle: {
    fontSize: 16,
    fontFamily: "Lexend-Regular",
  },
  shadowedUnderline: {
    borderWidth: 1,
    alignSelf: "stretch",
    borderColor: "white",
    marginTop: 30,
    marginBottom: 15,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    backgroundColor: "#0447B3",
  },
  dateInputStyle: {
    marginTop: 15,
    marginBottom: 15,
    width: 380,
    paddingLeft: 15,
    margin: 10,
  },
});

export default NewTaskScreen;
