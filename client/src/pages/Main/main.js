import React from 'react';
import Article from '../../components/Article';
import Single from '../../pages/Single';
import './main.css';

import { useQuery } from 'apollo/client';
import { GET_ARTICLES } from '../../utils/queries';

const Main = () => {
  const [saveArticle] = useQuery(GET_ARTICLES);

  return (
    <main>
      <div className="flex-row justify-space-between">
        {saveArticle && (
          <div className="col-12 mb-3">
            <Article />
          </div>
        )}
        <Single _id={Article} />
      </div>
    </main>
  );
};

export default Main;
