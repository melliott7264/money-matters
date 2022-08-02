import React, { useEffect, useState } from 'react';
import { Container, Row, Form, Button } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ARTICLE } from '../../utils/queries';
import { ADD_COMMENT } from '../../utils/mutations';

import './single.css';

import Article from '../../components/Article';
import Comment from '../../components/Comment';

// *** Import Global State support - need to access the article id (article_id) in global state
import { useGlobalState } from '../../App';

// page to display articles with comments - need to pass in article id - we can retrieve the rest
const Single = () => {
  // *** Using global state to provide the article_id ***
  // Call React hook for global state
  const [state, dispatch] = useGlobalState();
  // setting id to article_id from global state
  const id = state.article_id;
  console.log('article id passed from global state: ' + id);

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

  // runs once data has loaded
  useEffect(() => {
    if (!error) {
      const article = data?.article || {};
      //sets userData displaying article information
      setArticleData(article);
    } else {
      console.error('There has been an error loading article data: ' + error);
    }
  }, [data, error]);

  const handleComment = async (event) => {
    event.preventDefault();
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

  return renderPage();

  function renderPage() {
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
            <Comment key={articleData._id} articleId={articleData._id} />
          </Row>
        </Row>
      </Container>
    );
  }
};

export default Single;
