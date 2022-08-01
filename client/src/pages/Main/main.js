import React, { useEffect, useState } from 'react';
import Article from '../../components/Article/Article';
import './main.css'
import { useQuery, useMutation} from '@apollo/client';
import { GET_ARTICLES, GET_ME } from '../../utils/queries';

import {
  Container,
  Row,
  
} from 'react-bootstrap';


const Main = () =>  {
    const [loading, saveArticle ] = useState({});
    const [articleData, setArticleData] = useState({});

    const { loading, error, data }
   

    
  
    return (
      <Container>
        <Row>
          <Article
            key={articleData.url}
            title={articleData.title}
            source={articleData.source}
            url={articleData.url}
            date={articleData.publishedAt}
            description={articleData.description}
          />
          <Row>
          <div className="flex-row justify-space-between">
          {saveArticle && (
            <div className="col-12 mb-3">
              <Article />
            </div>
          )}
          <Single _id = {Article}/>
         
     
        </div>
  </Row>
  </Row>
  </Container>

);

  


};

export default Main;
