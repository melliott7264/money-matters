import axios from "axios";

export default {
  getArticles: (query) => {
    return axios.get("/api/articles");
  }
};