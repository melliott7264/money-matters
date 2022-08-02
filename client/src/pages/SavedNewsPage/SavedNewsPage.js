import React, { useState, useEffect } from 'react';
import Auth from '../../utils/auth';
import { removeArticleid, saveArticleIds } from '../../utils/localstorage';
import { ADD_POST, REMOVE_ARTICLE } from '../../utils/mutations';
import { GET_ME } from '../../utils/queries';
import { useQuery, useMutation } from '@apollo/client';

// Imports the Article & CSS from SavedNewsPage.css
import Article from '../../components/Article';
import './SavedNewsPage.css';

// Import Bootstrap CSS
import {
    Container,
    Row,
    Button,
} from 'react-bootstrap';


const SavedNewsPage = () => {
    const [userData, setUserData] = useState({});
    const [AddPostArticle] = useMutation(ADD_POST);
    const [deleteArticle] = useMutation(REMOVE_ARTICLE);

    //User GraphQL query to collect currently logged in user data & authentication info 
    const { loading , data } = useQuery(GET_ME);

    // Starts once the data is loaded
    useEffect(() => {
        const user = data?.me || {};
        setUserData(user);
    }, [data]);
    //Verify if saved Article info for logged in user has finished loading
    if (userData.savedArticles?.length) {
        //This creates a array of saved articleId from articles saved to database for sign-in User
        const savedArticles = userData.savedArticles.map(article => {
            return article.articleId;
        });
        saveArticleIds(savedArticles);
    }
// Function that accepts the Article Id value as parameter and deletes the article from the database
    const handleDeleteArticle = async (articleId) => {
        try {
            const response = await deleteArticle({
                variable: { articleId: articleId },
            });
            if (response) {
                removeArticleid(articleId);
            }
        } catch (err) {
            console.log(err);

        }
    };  
const handleAddPostArticle = async (articleId) => {
    try {
        const response = await AddPostArticle({
            variable: { _id: articleId, post: true},
        })
    } catch (err) {
        console.log(err);

    }
};

    // Failure to upload the data you will receive this message 
    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    // Returns the saved articles
    return (
        <>
            <Container>
                <span className="card-title text-center">Saved Articles</span>
            </Container>
            <Container>
                <h1>
                    {userData.savedArticles?.length
                        ? `Viewing ${userData.savedArticles.length} saved ${userData.savedArticles.length === 1 ? 'article' : 'articles'
                        }:`
                        : 'No saved articles!'}
                </h1>
                <Row>
                    <div className="panel-body">
                        <ul className="list-group">
                            {userData.savedArticles?.map((article => (
                                <Article
                                    key={article.url}
                                    title={article.title}
                                    source={article.source}
                                    url={article.url}
                                    date={article.publishedAt}
                                    description={article.description}
                                    urlToImage={article.urlToImage}
                                >
                                    <Button 
                                           className="btn-block btn-primary"
                                           onClick={() => handleAddPostArticle(article.articleId)}
                                           >Add Post
                                    </Button>
                                <Button
                                    className="btn-block btn-danger"
                                    onClick={() => handleDeleteArticle(article.articleId)}
                                >Delete this Article!</Button>
                                </Article>
                              )))}
                          </ul>
                      </div>
                  </Row>
              </Container>
          </>
      );
  };
                              
export default SavedNewsPage;
                                
                                    



