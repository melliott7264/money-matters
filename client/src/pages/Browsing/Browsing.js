import React, {Component} from 'react';
import Article from '../../components/Article';
import Footer from '../../components/Footer';

import './browsing.css'
import axios from "axios";

// Need to store this in a .env file in the future. 
const api_key = '756752a60f5b4b0da01c1c635aebe0ed';

class Browsing extends Component {
    state = {
        articles: []
    };
    
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    getArticles() {
        axios
          .get(
            "https://newsapi.org/v2/top-headlines?country=us&category=business&sortBy=publishedAt&pageSize=100&apiKey=" + api_key
          )
          
          .then(res => {
              const articles = res.data.articles;
              console.log(articles);
              this.setState({ articles: articles });
            })
      }

    render() {
        return (
            <div>
                <div className="jumbotron">
                    <h2 className="text-center">
                        Get the Latest News About the Economy Here
                    </h2>
                    <div className="text-center">
                        <button className="btn btn-success btn-md mt-1" onClick={() => this.getArticles()}>Get News</button>
                    </div>
                </div>
                <div class="container">
                    <div class="row">
                    <div class="col-md-12">
                    <div className="card border-success mb-3">
                    <div className="card-header text-white bg-success border-success">
                        <span className="card-title text-center">Latest Headlines</span>
                    </div>
                    <div className="card-body">
                        <div className="panel-body">
                                <ul className= "list-group">
                                    {this.state.articles.map(article => (
                                        <Article
                                        key={article.url}
                                        title={article.title}
                                        source={article.source}
                                        url={article.url}
                                        date={article.publishedAt}
                                        description={article.description}
                                        urlToImage={article.urlToImage}
                                        />
                                    ))}
                                </ul>
                            
                            </div>
                        </div>
                    </div>
                    </div>
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}

export default Browsing;