import React, { useState, useEffect } from 'react';
import Auth from '../utils/auth';
import { removeArticleid, saveArticleIds } from '../utils/localStorage';
import { REMOVE_ARTICLE } from '../utils/graphql/mutations';
import { GET_ME } from '../utils/queries';
import { useQuery, useMutation } from '@apollo/client';

// Imports the Article & CSS from SavedNewsPage.css
import Article from '../components/Article';
import './/SavedNewsPage.css';

// Import Bootstrap CSS
import {
    Jumbotron,
    Container,
    Row,
    Button,
} from 'react-bootstrap';

const SavedNewsPage = () => {
    const [userData, setUserData] = useState({});
    const [deleteArticle, { error }] = useMutation(REMOVE_ARTICLE);

    // const userDataLength = Object.keys(userData).length;

    const { loading, data } = useQuery(GET_ME);

    useEffect(() => {
        const user = data?.me || {};
        setUserData(user);
    }, [data]);

    if (userData.savedArticles?.length) {

        const savedArticles = userData.savedArticles.map(article => {
            return article.articleId;
        });
        saveArticleIds(savedArticles);
    }

    const handleDeleteArticle = async (articleId) => {
        try {
            const reposne = await deleteArticle({
                variable: { articleId: articleId },
            });
            if (response) {
                removeArticleid(articleId);
            }
        } catch (err) {
            console.log(err);

        }
    };

    // Failure to upload the data you will receive this message 
    if (!userDataLength) {
        return <div>Loading...</div>;
    }

    // Returns the saved articles
    return (
        <>
        <Jumbotron>
            <Container>
                <span className="card-title text-center">Saved Articles</span>
            </Container>
        </Jumbotron>
        <Container>
            <h1>
                {userData.savedArticles?.length
                ? `Viewing ${userData.savedArticles.length} saved ${
                    userData.savedArticles.length === 1 ? 'article' : 'articles'
                }:`
                : 'No saved articles!'}
            </h1>
                <Row>
                    <div className="panel-body">
                        <ul className="list-group">
                            {this.state.articles.map(article => (
                                <Article
                                key={articleData.url}
                                title={articleData.title}
                                source={articleData.source}
                                url={articleData.url}
                                date={articleData.publishedAt}
                                description={articleData.description}
                                urlToImage={articleData.urlToImage}
                                />
                            ))}
                        </ul>
                        <Button
                            className="btn-block btn-danger"
                            onClick={() => handleDeleteArticle(article.articleId)}
                        >Delete this Article!</Button>
                    </div>
                </Row>
            </Container>
        </>
    );
};

export default SavedNewsPage;

