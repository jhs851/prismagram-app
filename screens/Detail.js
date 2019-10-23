import React from 'react';
import { ScrollView } from 'react-native';
import { useQuery } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';
import { POST_FRAGMENT } from '../fragments';
import Loader from '../components/Loader';
import Post from '../components/Post';

const POST_DETAIL = gql`
    query seeFullPost($id: String!) {
        seeFullPost(id: $id) {
            ...PostParts
        }
    }
    ${POST_FRAGMENT}
`;

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
            <ScrollView>
                <Post {...data.seeFullPost} />
            </ScrollView>
        );
    }

    return null;
};