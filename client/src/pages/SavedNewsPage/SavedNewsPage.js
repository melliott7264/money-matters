import React, { useState, useEffect } from 'react';


const SavedNewsPage = () => {
    const [userData, setUserData] = useState({});
    
 
    const userDataLength = Object.keys(userData).length;

    useEffect(() => {
        const getUserData = async () => {
            try {
                const token = Auth.loggedIn() ? Auth.getToken() : null;

                if (!token) {
                    return false;
            }

            const response = await getMe(token);

            if(!response.ok) {
                throw new Error('Something went wrong!');
            }
            const user = await response.json();
            setUserData(user);
        } catch (err) {
        console.error(err);
        }
    };

    getUserData();
  },  [userDataLength]);

  const handleDeleteArticle = async (articleId) => {

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
        return false;
    }

    try {
        const response = await deleteArticle(articleId, token);

        if(!response.ok) {
            throw new Error('Something went wrong!');
    }

    const updatedUser = await response.json();
    setUserData(updatedUser);
    removeArticleid(articleId);
    } catch (err) {
        console.error(err);
    }
};

// Failure to upload the data you will receive this message 
if (!userDataLength) {
    return <div>Loading...</div>;
}

// Returns the saved articles
return (
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
                    ))}
                </ul>

            </div>
        </div>
    </div>

);
}

export default SavedNewsPage;