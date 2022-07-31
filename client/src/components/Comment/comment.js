// Display all comments for an article
import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { GET_COMMENTS } from '../../utils/queries';
import { REMOVE_COMMENT, EDIT_COMMENT } from '../../utils/mutations';

import './comment.css';

// passing in: articleId and querying all comments
const Comment = ({ articleId }) => {
  // set comment data state
  const [commentData, setComment] = useState();
  // set state for modal - false - closed
  const [setModalData, setModal] = useState({ isOpen: false });
  // set state for comment edit
  const [editCommentData, setEditComment] = useState();

  // functions to open and close edit modal
  const openModel = () => setModal({ isOpen: true });
  const closeModel = () => setModal({ isOpen: false });

  // define callback functions for mutations
  const [deleteComment, { delError }] = useMutation(REMOVE_COMMENT);
  const [editComment, { editError }] = useMutation(EDIT_COMMENT);

  // GET_COMMENTS returns: (comment)_id, articleId, postDate, username, commentBody
  const { loading, error, data } = useQuery(GET_COMMENTS, {
    variables: { articleId: articleId },
  });

  // runs once data has loaded
  useEffect(() => {
    const comment = data?.comments || [];
    //sets commentData displaying comments
    setComment(comment);
  }, [data]);

  const handleDeleteComment = async (commentId, articleId) => {
    try {
      const response = await deleteComment({
        variables: { id: commentId, articleId: articleId },
      });
      // had to use this because the change state didn't work
      window.location.reload(false);
      // setComment([...commentData]);
    } catch (err) {
      console.error(err);
    }
  };

  // function to submit comment edit via EDIT_COMMENT mutation
  const handleEditComment = (commentId, commentBody) => {};

  // functon to update setEditComment state while editing comment text
  const handleCommentChange = (event) => {};

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
            onClick={() => handleDeleteComment(comment._id, comment.articleId)}
          >
            Delete Comment
          </button>
          <button className="btn text-primary">Edit Comment</button>
        </span>
      </div>
      <Modal>
        <Modal.Header closeButton>
          <Modal.Title>Edit Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Form
          onSubmit={() => handleEditComment(comment._id, comment.commentBody)}
        >
          <Form.Group>
            <Form.Label>Comment Text:</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              name="commentBody"
              value={comment.commentBody}
              onChange={() => handleCommentChange()}
            />
          </Form.Group>

          <Button className="mt-2" type="submit" variant="primary">
            Submit Changes
          </Button>
        </Form>
        <Modal.Footer>
          <Button variant="secondary">Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  ));
};

export default Comment;
