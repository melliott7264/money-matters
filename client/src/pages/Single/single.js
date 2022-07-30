import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ARTICLE } from '../../utils/queries';
import {
  ADD_COMMENT,
  REMOVE_COMMENT,
  EDIT_COMMENT,
} from '../../utils/mutations';

import './comment.css';

import Article from '../../components/Article';
import Comment from '../../components/Comment';

// page to display articles with comments - need to pass in article id - we can retrieve the rest

const Single = ({ _id }) => {
  // use useState to update screen with article data
  const [articleData, setArticleData] = useState({});
  // get comment state
  const [commentData, setComment] = useState({});

  // define callback functions for mutations
  const [addComment, { addError }] = useMutation(ADD_COMMENT);
  const [deleteComment, { delError }] = useMutation(REMOVE_COMMENT);
  const [editComment, { editError }] = useMutation(EDIT_COMMENT);

  // GET_ARTICAL returns: (user)_id, (article)articleDate, postDate, source, title, description, url, username, commentCount
  // (comment)_id, articleId, postDate, username, commentBody
  const { loading, error, data } = useQuery(GET_ARTICLE, {
    variables: { id: _id },
  });

  // runs once data has loaded
  useEffect(() => {
    const article = data?.article || {};
    //sets userData displaying article information
    setArticleData(article);
    console.log('articleData: ' + articleData);
  }, [data]);

  const handleComment = async (userId) => {
    try {
      const response = await addComment({
        variables: { articleId: userId, commentBody: commentData },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
    console.log('comment change: ' + commentData);
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error! ${error.message}</h2>;
  }

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
          urlToImage={articleData.urlToImage}
        />
        <Row>
          <Form onSubmit={handleComment(articleData.user._id)}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  as="textarea"
                  name="commentBody"
                  value={articleData.comment.commentBody}
                  onChange={handleCommentChange}
                  size="lg"
                  placeholder="Comment on the article..."
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Add Comment
                </Button>
              </Col>
            </Form.Row>
          </Form>
          <Comment />
        </Row>
      </Row>
    </Container>
  );
};

export default Single;
