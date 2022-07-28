import { gql } from '@apollo/client';

// Variables must match variables used in callback function in components and pages.
// Property names must match resolvers on back-end
// Arguments must match typeDefs on back-end

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_ARTICLE = gql`
mutation saveArticle($articleDate: String!, $source: String!, $title: String!, $description: String!, $url: String!, $username: String!) {
	saveArticle(articleDate: $articleDate, source: $source, title: $title, description: $description, url: $url, username: $username) {
	_id
	articleDate
	postDate
	source
	title 
	description
	url
	username
}
`;

export const REMOVE_ARTICLE = gql`
  mutation removeArticle($id: ID!) {
    removeArticle(_id: $id) {
      _id
      title
      username
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($articleId: ID!, $commentBody: String!) {
    addComment(articleId: $articleId, commentBody: $commentBody) {
      _id
      articleId
      commentBody
      postDate
      username
    }
  }
`;

export const REMOVE_COMMENT = gql`
  mutation removeComment($id: ID!, $articleId: ID!) {
    removeComment(_id: $id, articleId: $articleId) {
      _id
      articleId
    }
  }
`;

export const EDIT_COMMENT = gql`
mutation editComment($_id: ID!, $commentBody: String!){
	editComment(_id: $_Id, commentBody: $commentBody) {
		_id
    articleId
		commentBody
		postDate
		username
		}
	}
}
`;
