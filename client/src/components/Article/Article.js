import React from 'react';
import moment from 'moment';
import { Globe } from 'react-bootstrap-icons';
import { Nav } from "react-bootstrap";
import './article.css'

const Article = ({title, source, url, id, date, description}) => (
    <li className="list-group-item px-2">
        <div className="d-flex align-items-end"> 
            {/* <h4>{source.name} : {title}</h4> */}
            <h4>{title}</h4>
            <Nav.Link href={url}>
            <Globe class="mb-3" color="royalblue" size={22} />
            </Nav.Link>
        </div>
        <p> {description}</p>
        <div> 
            <div class='row g-0 align-middle'>
                <div class='col-md-4 mt-2'>
                    <p>
                        Date: {moment(date).format('MMMM Do YYYY, h:mm a')}
                    </p>
                </div>
                <div class='col-md-4 w-auto ms-auto'> 
                    <span className="btn-group float-right">
                        <button className="btn text-primary">
                            Post Article
                        </button>
                        <button className="btn text-danger">
                            Save Article
                        </button>
                    </span>
                </div>
            </div> 
        </div>
    </li>
)

export default Article;