import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';
import { POST_FREGMENT } from '../fragments';
import Loader from '../components/Loader';
import Post from '../components/Post';

const POST_DETAIL = gql`
    query seeFullPost($id: String!) {
        seeFullPost(id: $id) {
            ...PostParts
        }
    }
    ${POST_FREGMENT}
`;

const View = styled.View``;

export default ({ navigation }) => {
    const { loading, data } = useQuery(POST_DETAIL, {
        variables: {
            id: navigation.getParam('id')
        }
    });

    console.log(data);

    if (loading) {
        return <Loader />;
    }

    if (! loading && data && data.seeFullPost) {
        return (
            <Post {...data.seeFullPost} />
        );
    }

    return null;
};