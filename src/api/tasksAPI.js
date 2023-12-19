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
  async createTask(title, description) {
    try {
      const response = await instance.post(`/createTask`, {
        title,
        description,
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
  async updateTask(id, updatedTask, deletedImages) {
    console.log("deletedImagesAPI", deletedImages);
    try {
      const response = await instance.put(`/updateTask/${id}`, {
        updatedTask: updatedTask,
        imagesName: deletedImages,
      });
      return response.data;
    } catch (err) {
      alert(err);
    }
  },
};
