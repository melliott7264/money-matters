import React, { useEffect, useState } from 'react';
import Article from '../../components/Article/Article';
import './main.css'

import { useQuery } from 'apollo/client';
import { GET_ARTICLES } from '../../utils/queries';


const Main = () =>  {
    const [loading, saveArticle ] = useState({});
    const [articleData, setArticleData] = useState({});

    const { loading, error, data }
   

    return (
        <main>
        <div className="flex-row justify-space-between">
          {saveArticle && (
            <div className="col-12 mb-3">
              <Article />
            </div>
          )}
          <Single _id = {Article}/>
         
     
        </div>
      </main>
    );
  
  


};

export default Main;
  
  


