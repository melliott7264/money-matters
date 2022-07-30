import React, { useState, useEffect } from 'react';
import Auth from '../../utils/auth';
import { removeArticleid, saveArticleIds } from '../utils/localStorage';
import { REMOVE_ARTICLE } from '../utils/graphql/mutations';
import { GET_ME } from '../utils/queries';

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
            <div>
                <h1>Saved Articles</h1>
                <div className="card-body">
                    <div className="panel-body">
                        <ul className="list-group">
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
                                //      <Button
                                //     className="btn-block btn-danger"
                                //     onClick={() => handleDeleteArticle(article.articleId)}
                                //   >Delete this Article!</Button>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SavedNewsPage;

