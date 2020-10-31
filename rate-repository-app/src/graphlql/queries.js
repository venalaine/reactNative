import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
    query{
        repositories{
          edges{
            node{
              id
              ownerAvatarUrl 
              ownerName 
              description 
              language 
              stargazersCount 
              forksCount 
              reviewCount 
              ratingAverage
            }
        }
    }
}`;

export const GET_AUTHORIZED_USER = gql`
  query{
    authorizedUser {
      id
      username
    }
  }`;

export const GET_REPOSITORY = gql`
    query findRepository($id: ID!){
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
      }
    }`;