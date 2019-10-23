import React from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import Loader from '../../components/Loader';
import { useQuery } from 'react-apollo-hooks';

const FEED_QUERY = gql`
    {
        seeFeed {
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
    }
`;

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

export default () => {
    const { data, loading } = useQuery(FEED_QUERY);

    console.log(data, loading);

    return (
        <View>
            {loading ? <Loader /> : null}
        </View>
    );
}