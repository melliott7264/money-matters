import React, { useState, useEffect } from 'react';
// import Auth from '../utils/auth';
import { removeArticleid, saveArticleIds } from '../../utils/localstorage';
import { REMOVE_ARTICLE } from '../../utils/mutations';
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
    const [deleteArticle] = useMutation(REMOVE_ARTICLE);

    const userDataLength = Object.keys(userData).length;

    const { data } = useQuery(GET_ME);

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

    // Failure to upload the data you will receive this message 
    if (!userDataLength) {
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

 // Creating a function to handle saving a Article to the database
//  const handleSaveArticle = async (articleId) => {
//     // find the Article in `searchedArticles` state by the matching id
//     const ArticleToSave = searchedArticles.find((article) => article.articleId === articleId);

//     try {
//       const response = await saveArticle({
//         variables: { body: { ...ArticleToSave } },
//       });

//       // If the Article successfully saves to user's account, save Article id to state
//       setSavedArticleIds([...savedArticleIds, ArticleToSave.articleId]);
//     } catch (err) {
//       console.error(err);
//     }
//   };



//If the user is login the save button Article option is shown 
// {Auth.loggedIn() && (
//     <Button
//       disabled={savedArticlesIds?.some(
//         (savedArticleId) => savedArticleId === article.articleId
//       )}
//       className="btn-block btn-info"
//       onClick={() => handleSaveArticle(article.articleId)}
//     >
//       {savedArticleIds?.some(
//         (savedArticleId) => savedArticleId === article.articleId
//       )
//         ? 'This Article has already been saved!'
//         : 'Save this Article!'}
//     </Button>
//   )}