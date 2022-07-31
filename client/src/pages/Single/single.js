import React, { useEffect, useState } from 'react';
import { Container, Row, Form, Button } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ARTICLE } from '../../utils/queries';
import { ADD_COMMENT } from '../../utils/mutations';

import './single.css';

import Article from '../../components/Article';
import Comment from '../../components/Comment';

// page to display articles with comments - need to pass in article id - we can retrieve the rest

const Single = ({ id }) => {
  // put in default id for testing - REMOVE FOR DEPLOYMENT
  if (!id) {
    id = '62e4057e8565cedb6f7b8887';
  }
  // use useState to update screen with article data
  const [articleData, setArticleData] = useState();
  // get comment state
  const [commentData, setComment] = useState();

  // define callback functions for mutations
  const [addComment, { addError }] = useMutation(ADD_COMMENT);

  // GET_ARTICAL returns: (user)_id, (article)articleDate, postDate, source, title, description, url, username, commentCount
  // (comment)_id, articleId, postDate, username, commentBody
  const { loading, error, data } = useQuery(GET_ARTICLE, {
    variables: { id: id },
  });

  // const article = data?.article || {};

  // runs once data has loaded
  useEffect(() => {
    const article = data?.article || {};
    //sets userData displaying article information
    setArticleData(article);
  }, [data]);

  const handleComment = async () => {
    try {
      const response = await addComment({
        variables: {
          articleId: articleData._id,
          commentBody: commentData,
          username: articleData.username,
        },
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
          <Form onSubmit={handleComment}>
            <Form.Group>
              <Form.Label>Comment on Article:</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                name="commentBody"
                value={commentData}
                onChange={handleCommentChange}
              />
            </Form.Group>

            <Button className="mt-2" type="submit" variant="primary">
              Add Comment
            </Button>
          </Form>
          <Comment articleId={articleData._id} />
        </Row>
      </Row>
    </Container>
  );
};

export default Single;
