import React, {Component} from 'react';
import Article from '../../components/Article_Browsing';

import API from "../../utils/API";
import './browsing.css'
import { useMutation } from '@apollo/client';
import { ADD_ARTICLE } from '../../utils/mutations';

//const [saveArticle, {error}] = useMutation(ADD_ARTICLE);

class Browsing extends Component {
    state = {
        articles: []
    };

    componentDidMount() {
        this.getArticles();
      }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    getArticles = () => {
    API.getArticles()
      .then(res =>{
        this.setState({ articles: res.data.articles}) 
      })
      .catch(err => console.log(err));
  };


    
    render() {
        return (
            <div>
                <div className="jumbotron">
                    <h2 className="text-center">
                        Get the Latest Economy News Here
                    </h2>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
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
                                                handleClick={this.saveArticle}
                                                />
                                            ))}
                                        </ul>
                                    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Browsing;