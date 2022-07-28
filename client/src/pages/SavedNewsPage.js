import React, { useState, useEffect } from 'react';

const SavedNewsPage =   () => {
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

    const updateUser = await response.json();
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
    <div></div>
);
}

export default SavedNewsPage;