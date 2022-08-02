import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { ADD_ARTICLE } from '../../utils/mutations';
import {GET_ME } from '../../utils/queries';
import { useMutation, useQuery } from '@apollo/client';
import { Globe } from 'react-bootstrap-icons';
import { Nav } from 'react-bootstrap';
import './article.css';
import { Link } from 'react-router-dom';

const Article = ({ article }) => {

  const [userData, setUserData] = useState({});
  const [addArticle] = useMutation(ADD_ARTICLE);
  const { data: userdata } = useQuery(GET_ME);
  
  useEffect(() => {
    const user = userdata?.me || {};
    setUserData(user);
  }, [userdata]);

  // Save article
  const handleSaveArticle = (article) => {
    // Avoid saving the same article more than once
    var alreadySaved = userData.savedArticles.filter(function (obj) {
      return obj.url === article.url;
    });

    try {
      // Provide feedback on wether a article is already saved or not.
      var button = document.getElementById(article._id);
      button.innerHTML = '';
      // Check if article is already saved
      if (!alreadySaved.length) {
        let description = '';
        // Allow article saving for null descriptions
        if (article.description !== null) {
          description = article.description;
        }
        const variables = {
          articleDate: article.publishedAt,
          source: article.source.name,
          title: article.title,
          description: description,
          url: article.url,
        };
        addArticle({
          variables,
        });
        // button feedback
        button.innerHTML =
          '<button disabled className="btn text-success">Saved</button>';
      } else {
        button.innerHTML =
          '<button disabled className="btn text-success">Already Saved</button>';
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
  <li key={article._id} className="list-group-item px-2">
    <div className="row">
      <div className="col-md-7">
        <p>
          Posted: {article.postDate} by {article.username}{' '}
        </p>
      </div>
      <div className="col-md-5">
        <p>Source: {article.source}</p>
      </div>
    </div>
    <div className="d-flex align-items-end">
      <h4>{article.title}</h4>
      <Nav.Link href={article.url}>
        <Globe
          className="mb-3"
          color="royalblue"
          size={22}
        />
      </Nav.Link>
    </div>
    <p> {article.description}</p>
    <div>
      <div className="row g-0 align-middle">
        <div className="col-md-3 mt-2">
          <Nav.Link
            as={Link}
            to={{
              pathname: '/single',
              props: { article_id: article._id },
            }}
          >
            <p className="text-primary">
              Comments: {article.commentCount}
            </p>
          </Nav.Link>
        </div>
        <div className="col-md-5 mt-2">
          <p>
            Published:{' '}
            {moment(Number(article.articleDate)).format(
              'MMMM Do YYYY, h:mm a'
            )}
          </p>
        </div>
        <div className="col-md-3 w-auto ms-auto">
          <span
            className="btn-group float-right"
            id={article._id}
          >
            <button
              onClick={() => handleSaveArticle(article)}
              className="btn text-danger"
            >
              Save Article
            </button>
          </span>
        </div>
      </div>
    </div>
  </li>
  )
}

export default Article;
