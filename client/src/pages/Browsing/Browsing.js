import React, {Component} from 'react';
import Article from '../../components/Article';
import Footer from '../../components/Footer';

import './browsing.css'
import axios from "axios";

// Need to store this in a .env file in the future. 
const api_key = '14e9f6d27bbb49dcab1ffe0bf2542b26';

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
            "https://newsapi.org/v2/everything?q=economy&sortBy=publishedAt&apiKey=" + api_key
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
                    <h1 className="text-center">
                        <strong>Money Matters</strong>
                    </h1>
                    <h2 className="text-center">
                        Get the latest news about the economy here
                    </h2>
                    <div className="text-center">
                        <button className="btn btn-success btn-lg" onClick={() => this.getArticles()}>Get News</button>
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
                                        id={article.url}
                                        title={article.title}
                                        source={article.source}
                                        url={article.url}
                                        date={article.publishedAt}
                                        description={article.description}
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