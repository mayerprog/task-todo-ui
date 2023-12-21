import {
  Keyboard,
  Modal,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Header from "../components/Header";
import NewTaskScreen from "./NewTaskScreen";
import { useEffect, useState } from "react";
import TaskListComponent from "../components/TaskListComponent";
import { tasksAPI } from "../api/tasksAPI";
import { useDispatch, useSelector } from "react-redux";
import {
  setTasks,
  removeTasks,
  removeAllLinks,
} from "../redux/slices/taskSlice";
import { GestureHandlerRootView } from "react-native-gesture-handler";
const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);

  useEffect(() => {
    (async () => {
      try {
        const getAll = await tasksAPI.getAll();
        console.log(getAll);
        dispatch(setTasks(getAll));
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.tasksArea}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <TaskListComponent
            tasks={tasks}
            setModalVisible={setModalVisible}
            removeTasks={removeTasks}
            navigation={navigation}
          />
        </GestureHandlerRootView>

        <Modal
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          animationType="slide"
          presentationStyle="formSheet"
        >
          <NewTaskScreen setModalVisible={setModalVisible} />
        </Modal>

        <Modal
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          animationType="slide"
          presentationStyle="formSheet"
        >
          <NewTaskScreen setModalVisible={setModalVisible} />
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#100810",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  tasksArea: {
    flex: 1,
    marginTop: 20,
  },
  textInput: {
    borderBottomWidth: 1,
    padding: 5,
    margin: 15,
    width: "80%",
  },
});

export default HomeScreen;
