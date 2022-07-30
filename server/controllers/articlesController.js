import axios from "axios";
// Need to store this in a .env file in the future. 
const api_key = '756752a60f5b4b0da01c1c635aebe0ed';

module.exports = {
  getAll: (req, res) => {
    axios
    .get(
      "https://newsapi.org/v2/top-headlines?country=us&category=business&sortBy=publishedAt&pageSize=100&apiKey=" + api_key
    )
    .then(res => {
        const articles = res.data.articles;
        console.log(articles);
        res.json(articles);
      })
  },
};