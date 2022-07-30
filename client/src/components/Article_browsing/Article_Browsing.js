import React from 'react';
import moment from 'moment';
import { Globe } from 'react-bootstrap-icons';
import { Nav } from 'react-bootstrap';
import './article_browsing.css';

const Article = ({ title, source, url, date, description, handleClick}) => (
  <li className="list-group-item px-2">
    <div className="d-flex align-items-end">
      {/* <h4>{source.name} : {title}</h4> */}
      <h4>{title}</h4>
      <Nav.Link href={url}>
        <Globe className="mb-3" color="royalblue" size={22} />
      </Nav.Link>
    </div>
    <p> {description}</p>
    <div>
      <div className="row g-0 align-middle">
        <div className="col-md-4 mt-2">
          <p>Date: {moment(date).format('MMMM Do YYYY, h:mm a')}</p>
        </div>
        <div className="col-md-4 w-auto ms-auto">
          <span className="btn-group float-right">
            <button onClick={() => handleClick()} className="btn text-danger">Save Article</button>
          </span>
        </div>
      </div>
    </div>
  </li>
);

export default Article;
