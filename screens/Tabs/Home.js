import React, { useState } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import Loader from '../../components/Loader';
import { useQuery } from 'react-apollo-hooks';
import Post from '../../components/Post';
import { POST_FREGMENT } from '../../fragments';

const FEED_QUERY = gql`
    {
        seeFeed {
            ...PostParts
        }
    }
    ${POST_FREGMENT}
`;

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

export default () => {
    const [refreshing, setRefreshing] = useState(false);
    const { data, loading, refetch } = useQuery(FEED_QUERY);
    const refresh = async () => {
        try {
            setRefreshing(true);
            await refetch();
        } catch (e) {
            console.log(e);
        } finally {
            setRefreshing(false);
        }
    };

    if (! loading && data && data.seeFeed) {
        return (
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}>
                {data.seeFeed.map(post => <Post key={post.id} {...post} />)}
            </ScrollView>
        );
    }

    return <View><Loader /></View>;
}