import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { editTask } from "../redux/slices/taskSlice";
import { tasksAPI } from "../api/tasksAPI";
import Checkbox from "expo-checkbox";

const InTaskScreen = ({ navigation, task, setChangeTask }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [isImportant, setIsImportant] = useState(task.isImportant);

  const dispatch = useDispatch();

  let updatedTask = {
    ...task,
  };

  const updateTask = async () => {
    if (title.trim().length === 0) {
      Alert.alert("Please add title");
      return;
    } else if (description.trim().length === 0) {
      Alert.alert("Please add description");
      return;
    }
    setButtonLoading(true);
    updatedTask.title = title;
    updatedTask.description = description;
    updatedTask.isImportant = isImportant;
    console.log("updatedtask", updatedTask);
    dispatch(editTask(updatedTask));
    await tasksAPI.updateTask(task._id, updatedTask);
    setChangeTask(false);
    setButtonLoading(false);
  };

  return (
    <View style={styles.task}>
      <View style={styles.taskContainer}>
        <TextInput
          style={[styles.text, { fontSize: 17, fontFamily: "Lexend-SemiBold" }]}
          placeholder="Title"
          defaultValue={title}
          onChangeText={(taskTitle) => setTitle(taskTitle)}
        />

        <TextInput
          style={[
            styles.text,
            {
              height: 200,
            },
          ]}
          multiline={true}
          maxLength={2000}
          placeholder="Description"
          defaultValue={description}
          onChangeText={(taskDescription) => setDescription(taskDescription)}
          scrollEnabled={true}
        />

        <View style={styles.shadowedUnderline} />
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "flex-start",
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

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 15,
          }}
        >
          {buttonLoading ? (
            <ActivityIndicator size="large" color="#fff" style={{}} />
          ) : (
            <TouchableOpacity onPress={updateTask}>
              <Text
                style={[
                  styles.text,
                  { fontFamily: "Poppins-Bold", fontSize: 15 },
                ]}
              >
                Update
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={() => setChangeTask(false)}>
            <Text
              style={[
                styles.text,
                { fontFamily: "Poppins-Bold", fontSize: 15 },
              ]}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  task: {
    width: "100%",
    alignItems: "center",
  },
  taskContainer: {
    backgroundColor: "#7D3F70",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 30,
    width: "90%",
    alignSelf: "center",
    margin: 5,
  },
  text: {
    color: "#FFFFFF",
    fontFamily: "Lexend-Regular",
    fontSize: 14,
    margin: 3,
  },
  shadowedUnderline: {
    borderWidth: 0.5,
    borderColor: "#C0C0C0",
    marginTop: 12,
    marginBottom: 5,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    backgroundColor: "#0447B3",
  },
});

export default InTaskScreen;
