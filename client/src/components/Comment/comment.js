// Display all comments for an article
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { GET_COMMENTS } from '../../utils/queries';
import { REMOVE_COMMENT, EDIT_COMMENT } from '../../utils/mutations';

import './comment.css';

// passing in: articleId and querying all comments
const Comment = ({ articleId }) => {
  // get comment state
  const [commentData, setComment] = useState();

  // define callback functions for mutations
  const [deleteComment, { delError }] = useMutation(REMOVE_COMMENT);
  const [editComment, { editError }] = useMutation(EDIT_COMMENT);

  // GET_ARTICAL returns: (user)_id, (article)articleDate, postDate, source, title, description, url, username, commentCount
  // (comment)_id, articleId, postDate, username, commentBody
  const { loading, error, data } = useQuery(GET_COMMENTS, {
    variables: { articleId: articleId },
  });

  // runs once data has loaded
  useEffect(() => {
    const comment = data?.comments || [];
    //sets userData displaying article information
    setComment(comment);
  }, [data]);

  const handleDeleteComment = async (commentId, articleId) => {
    try {
      const response = await deleteComment({
        variables: { _id: commentId, articleId: articleId },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error! ${error.message}</h2>;
  }

  return commentData.map((comment) => (
    <div key={comment._id}>
      <div>
        <hr style={{ height: '2px' }} />
      </div>
      <div className="pt=2">
        <span className="pr-4">{comment.postDate}</span>
        <span className="p-4 float-right">{comment.username}</span>
      </div>
      <div>
        <p className="pt-2">{comment.commentBody}</p>
      </div>
      <div>
        <span className="btn-group float-right">
          <button
            className="btn text-danger"
            // onClick={handleDeleteComment(comment._id, comment.articleId)}
          >
            Delete Comment
          </button>
          <button className="btn text-primary">Edit Comment</button>
        </span>
      </div>
    </div>
  ));
};

export default Comment;
