import React from 'react';
import moment from 'moment';
import { Globe } from 'react-bootstrap-icons';
import { Nav } from 'react-bootstrap';
import './article_browsing.css';
import { useMutation } from '@apollo/client';
import { ADD_ARTICLE } from '../../utils/mutations';

const Article = ({ article}) => {
  const [addArticle] = useMutation(ADD_ARTICLE)

  const handleSaveArticle = (article) => {
    try {
        const variables = { articleDate: article.publishedAt, source: article.source.name,
           title: article.title, description: article.description, url: article.url }
        addArticle({
            variables,
        });
    } catch (err) {
        console.log(err);

    }
};
  return (
  <li className="list-group-item px-2">
    <div className="d-flex align-items-end">
      {/* <h4>{source.name} : {title}</h4> */}
      <h4>{article.title}</h4>
      <Nav.Link href={article.url}>
        <Globe className="mb-3" color="royalblue" size={22} />
      </Nav.Link>
    </div>
    <p> {article.description}</p>
    <div>
      <div className="row g-0 align-middle">
        <div className="col-md-4 mt-2">
          <p>Date: {moment(article.publishedAt).format('MMMM Do YYYY, h:mm a')}</p>
        </div>
        <div className="col-md-4 w-auto ms-auto">
          <span className="btn-group float-right">
            <button onClick={() => handleSaveArticle(article)} className="btn text-danger">Save Article</button>
          </span>
        </div>
      </div>
    </div>
  </li>
);
}

export default Article;
