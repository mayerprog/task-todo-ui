import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import {
  PanGestureHandler,
  State,
  TapGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { tasksAPI } from "../api/tasksAPI";
import { editTask } from "../redux/slices/taskSlice";
import InTaskScreen from "../screens/InTaskScreen";

const TaskListItem = ({
  task,
  simultaneousHandlers,
  setScrollEnabled,
  removeTasks,
}) => {
  const [height, setHeight] = useState();
  const [changeTask, setChangeTask] = useState(false);
  const [isTaskDone, setIsTaskDone] = useState(task.isDone);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  let updatedTask = {
    ...task,
  };

  const translateX = useSharedValue(0);
  const taskPannedRight = useSharedValue(false);
  const itemHeight = useSharedValue(height);
  const marginVertical = useSharedValue(5);
  const opacity = useSharedValue(1);

  const { width: SCREEN_WIDTH } = Dimensions.get("window");
  const SCROLLING_THRESHOLD = SCREEN_WIDTH * 0.01;

  const handleRemoveTask = async () => {
    await tasksAPI.deleteOne(task._id);
    dispatch(removeTasks(task._id));
  };
  const handleIsDoneTask = async () => {
    setLoading(true);
    const updatedIsTaskDone = !isTaskDone;
    setIsTaskDone(updatedIsTaskDone);
    updatedTask.isDone = updatedIsTaskDone;
    await tasksAPI.updateTask(task._id, updatedTask);
    dispatch(editTask(updatedTask));
    setLoading(false);
  };

  const handleDoubleTap = () => {
    if (!task.isDone) setChangeTask(true);
  };

  const panGesture = useAnimatedGestureHandler({
    onActive: (event) => {
      translateX.value = withTiming(event.translationX, { duration: 50 });
      if (
        translateX.value < -SCROLLING_THRESHOLD ||
        translateX.value > SCROLLING_THRESHOLD
      ) {
        runOnJS(setScrollEnabled)(false);
      }
    },
    onEnd: () => {
      if (translateX.value < -SCREEN_WIDTH * 0.3) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        opacity.value = withTiming(0, undefined, (isFinished) => {
          if (isFinished) {
            runOnJS(handleRemoveTask)();
          }
        });
      } else if (translateX.value > SCREEN_WIDTH * 0.3) {
        taskPannedRight.value = true;
        translateX.value = withTiming(SCREEN_WIDTH * 0.3);
        translateX.value = withTiming(0, undefined, (isFinished) => {
          if (isFinished) {
            runOnJS(handleIsDoneTask)();
          }
        });
      } else {
        translateX.value = withTiming(0);
        taskPannedRight.value = false;
      }

      if (
        translateX.value > -SCROLLING_THRESHOLD ||
        translateX.value < SCROLLING_THRESHOLD
      ) {
        runOnJS(setScrollEnabled)(true);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => {
    const backgroundColor = task.isDone && !changeTask ? "#296C30" : "#7D3F70";

    return {
      backgroundColor,
      transform: [{ translateX: translateX.value }],
    };
  });

  const rIconContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(translateX.value < -SCREEN_WIDTH * 0.25 ? 1 : 0);
    return { opacity };
  });

  const doneIconContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(translateX.value < SCREEN_WIDTH * 0.3 ? 0 : 1);
    return { opacity };
  });

  const rTaskContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVertical.value,
      opacity: opacity.value,
    };
  });

  return (
    <View>
      {!changeTask ? (
        <TapGestureHandler
          onHandlerStateChange={({ nativeEvent }) => {
            if (nativeEvent.state === State.ACTIVE) {
              handleDoubleTap();
            }
          }}
          numberOfTaps={2}
        >
          <Animated.View
            style={[styles.task, rTaskContainerStyle]}
            onLayout={({ nativeEvent }) => {
              const { height } = nativeEvent.layout;
              setHeight(height);
            }}
          >
            <Animated.View
              style={[
                styles.iconContainer,
                rIconContainerStyle,
                { right: "10%" },
              ]}
            >
              <MaterialCommunityIcons
                name="delete-empty"
                size={60}
                color="red"
              />
            </Animated.View>
            <Animated.View
              style={[
                styles.iconContainer,
                doneIconContainerStyle,
                { left: "10%" },
              ]}
            >
              {!task.isDone ? (
                <Ionicons
                  name="md-checkmark-done-sharp"
                  size={60}
                  color="green"
                />
              ) : (
                <MaterialIcons name="remove-done" size={60} color="red" />
              )}
            </Animated.View>
            <PanGestureHandler
              onGestureEvent={panGesture}
              simultaneousHandlers={simultaneousHandlers}
            >
              {loading ? (
                <Animated.View style={[styles.taskContainer, rStyle]}>
                  <ActivityIndicator
                    size="large"
                    color="#fff"
                    style={{
                      alignSelf: "center",
                      alignItems: "stretch",
                      paddingVertical: 14,
                    }}
                  />
                </Animated.View>
              ) : (
                <Animated.View style={[styles.taskContainer, rStyle]}>
                  <Text
                    style={[
                      styles.text,
                      { fontSize: 17, fontFamily: "Lexend-SemiBold" },
                    ]}
                  >
                    {task.title}
                  </Text>
                  <Text
                    style={[styles.text, { marginTop: 5 }]}
                    numberOfLines={2}
                  >
                    {task.description}
                  </Text>
                  {!task.isDone && (
                    <>
                      <View style={styles.shadowedUnderline} />
                      {task.isImportant ? (
                        <Text style={styles.text}>Important</Text>
                      ) : (
                        <Text style={styles.text}>All</Text>
                      )}
                    </>
                  )}
                </Animated.View>
              )}
            </PanGestureHandler>
          </Animated.View>
        </TapGestureHandler>
      ) : (
        <InTaskScreen task={task} setChangeTask={setChangeTask} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  task: {
    width: "100%",
    alignItems: "center",
  },
  taskContainer: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 30,
    width: "90%",
    alignSelf: "center",
    alignItems: "stretch",
    borderColor: "black",
    paddingVertical: 14,
  },
  text: {
    color: "#FFFFFF",
    fontFamily: "Lexend-Regular",
    fontSize: 14,
    margin: 3,
  },
  shadowedUnderline: {
    borderWidth: 0.5,
    marginTop: 12,
    marginBottom: 5,
    borderColor: "#C0C0C0",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    backgroundColor: "#0447B3",
  },
  iconContainer: {
    height: "100%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TaskListItem;
