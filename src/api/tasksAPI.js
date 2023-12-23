import axios from "axios";
const { baseURL } = require("../../config");

const path = "/tasks";

const instance = axios.create({
  baseURL: baseURL + path,
  withCredentials: true,
  // headers: {
  //   Accept: "application/json",
  // },
});

export const tasksAPI = {
  async createTask(title, description, isImportant, isDone) {
    try {
      const response = await instance.post(`/createTask`, {
        title,
        description,
        isImportant,
        isDone,
      });
      return response.data;
    } catch (err) {
      console.error(
        "Error creating task:",
        err.response ? err.response.data : err
      );
      alert("Failed to create task. Check console for details.");
    }
  },
  async getAll() {
    try {
      const response = await instance.get(`/getAll`);
      return response.data;
    } catch (err) {
      alert(err);
    }
  },
  async deleteOne(id) {
    try {
      const response = await instance.delete(`/deleteOne/${id}`);
      return response.data;
    } catch (err) {
      alert(err);
    }
  },
  async updateTask(taskID, updatedTask) {
    console.log("updatedTask", updatedTask);
    try {
      const response = await instance.put(`/updateTask/${taskID}`, {
        updatedTask: updatedTask,
      });
      return response.data;
    } catch (err) {
      alert(err);
    }
  },
};
