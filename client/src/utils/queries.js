import { gql } from '@apollo/client';

// Query all articles for user (for the saved news page)
export const GET_ARTICLES = gql`
  query articles {
    articles {
      _id
      userId
      articleDate
      postDate
      source
      title
      description
      url
      username
    }
  }
`;

// Query specific article for viewing or commenting
export const GET_ARTICLE = gql`
  query article($id: ID!) {
    article(_id: $id) {
      _id
      articleDate
      postDate
      source
      title
      description
      URL
      username
      Comments {
        _id
        postDate
        username
        commentBody
      }
    }
  }
`;

// Query all comments for user
export const GET_COMMENTS = gql`
  query comments($username: String!) {
    comments(username: $username) {
      _id
      articleId
      commentBody
      postDate
      username
    }
  }
`;

// Query specific comment
export const GET_COMMENT = gql`
  query comment($id: ID!) {
    comment(_id: $id) {
      _id
      articleId
      commentBody
      postDate
      username
    }
  }
`;

// Query for logged-in user
export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      savedArticles {
        _id
        articleDate
        postDate
        source
        title
        description
        url
        username
        comments {
          _id
          articleId
          commentBody
          postDate
          username
        }
      }
    }
  }
`;
