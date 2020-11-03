import { gql } from 'apollo-boost';

export const AUTHORIZE = gql`
    mutation authorize($credentials: AuthorizeInput!) {
        authorize(credentials: $credentials) {
            accessToken 
        }
    }
`;

export const CREATE_REVIEW = gql`
    mutation createReview($review: CreateReviewInput!) {
        createReview(review: $review) {
                id
        }
    }
`;
