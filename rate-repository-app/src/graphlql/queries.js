import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
  query repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, $first: Int, $after: String){
      repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, first: $first, after: $after){
        edges{
          node{
            id
            ownerAvatarUrl 
            fullName
            ownerName 
            description 
            language 
            stargazersCount 
            forksCount 
            reviewCount 
            ratingAverage
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          totalCount
          hasNextPage
        }
      }
    }
  `;

export const GET_AUTHORIZED_USER = gql`
  query{
    authorizedUser {
      id
      username
    }
  }`;

export const GET_REPOSITORY = gql`
  query findRepository($id: ID!, $first: Int, $after: String){
    repository(id: $id) {
      id
      fullName
      url
      ownerAvatarUrl 
      ownerName 
      description 
      language 
      stargazersCount 
      forksCount 
      reviewCount 
      ratingAverage
      reviews(first: $first, after: $after) {
        edges {
          node {
            id
            text
            rating
            createdAt
            repositoryId
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          totalCount
          hasNextPage
        }
      }
    }
  }
`;

// Tämä jäikin nyt tarpeettomaksi, kun tajusinkin tehtävässä 25, että reviewit saa samalla kyselyllä kun repositoryn
export const GET_REVIEWS = gql`
  query findReview($id: ID!, , $first: Int, $after: String){
    repository(id: $id) {
      id
      fullName
      reviews(first: $first, after: $after) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;     
