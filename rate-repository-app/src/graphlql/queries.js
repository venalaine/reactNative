import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
    query{
        repositories{
          edges{
            node{
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