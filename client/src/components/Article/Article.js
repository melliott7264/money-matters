import React from 'react';
import moment from 'moment';
import { Globe } from 'react-bootstrap-icons';
import { Nav } from "react-bootstrap";
import './article.css'

const Article = ({title, source, url, id, date, description}) => (
    <li className="list-group-item px-2">
        <div className="d-flex align-items-end"> 
        <h4>{source.name} : {title}</h4>
        <Nav.Link href={url}>
        <Globe class="mt-2" color="royalblue" size={22} />
        </Nav.Link>
        </div>
        <p> {description}</p>
        <span className="btn-group float-right">
            <button onClick={() => handleClick(id)} className="btn text-primary">
                Post Article
            </button>
            <button onClick={() => handleClick(id)} className="btn text-danger">
                Save Article
            </button>
        </span>
        <p>
        Date: {moment(date).format('MMMM Do YYYY, h:mm a')}
        </p>
    </li>
)

export default Article;