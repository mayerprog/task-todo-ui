import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { Ionicons } from "@expo/vector-icons";

import SegmentedControlIOS from "@react-native-segmented-control/segmented-control";
import TaskListItem from "./TaskListItem";

const TaskListComponent = ({
  tasks,
  setModalVisible,
  removeTasks,
  navigation,
}) => {
  const scrollRef = useRef(null);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(0);
  const importantTasks = tasks.filter((task) => task.isImportant);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SegmentedControlIOS
        values={["All", "Important"]}
        selectedIndex={selectedFilterIndex}
        onChange={(event) => {
          setSelectedFilterIndex(event.nativeEvent.selectedSegmentIndex);
        }}
        style={{ margin: 15 }}
        tintColor="white"
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            flexDirection: "column",
            justifyContent: "space-between",
            paddingBottom: 40,
          }}
          ref={scrollRef}
          scrollEnabled={scrollEnabled}
          keyboardShouldPersistTaps="handled"
          removeClippedSubviews={true}
        >
          {selectedFilterIndex === 1
            ? importantTasks.map((task) => (
                <TaskListItem
                  task={task}
                  key={task._id}
                  simultaneousHandlers={scrollRef}
                  setScrollEnabled={setScrollEnabled}
                  removeTasks={removeTasks}
                  navigation={navigation}
                />
              ))
            : tasks.map((task) => (
                <TaskListItem
                  task={task}
                  key={task._id}
                  simultaneousHandlers={scrollRef}
                  setScrollEnabled={setScrollEnabled}
                  removeTasks={removeTasks}
                  navigation={navigation}
                />
              ))}
          <View style={styles.sumIconStyle}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Ionicons name="add-circle" size={70} color="#7D3F70" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sumIconStyle: {
    flex: 1,
    flexGrow: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 25,
    height: "30%",
  },
});

export default TaskListComponent;
