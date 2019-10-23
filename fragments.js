import { gql } from 'apollo-boost';

export const POST_FREGMENT = gql`
    fragment PostParts on Post {
        id
        location
        caption
        user {
            id
            avatar
            username
        }
        files {
            id
            url
        }
        likeCount
        isLiked
        comments {
            id
            text
            user {
                id
                username
            }
        }
        createdAt
    }
`;