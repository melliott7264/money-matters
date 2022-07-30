import axios from "axios";

const PORT = process.env.PORT || 3001;
const serverPath = `http://localhost:${PORT}`

export default {
  getArticles: (query) => {
    return axios.get(serverPath + "/api/articles");
  }
};