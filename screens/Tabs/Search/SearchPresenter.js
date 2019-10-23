import React, { useState } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo-hooks';
import Loader from '../../../components/Loader';
import SquarePhoto from '../../../components/SquarePhoto';

export const SEARCH = gql`
    query searchPost($term: String!) {
        searchPost(term: $term) {
            id
            files {
                id
                url
            }
            likeCount
            commentCount
        }
        searchUser(term: $term) {
            id
            avatar
            username
            isFollowing
            isSelf
        }
    }
`;

const SearchPresenter = ({ term, shouldFetch }) => {
    const [refreshing, setRefreshing] = useState(false);
    const { data, loading, refetch } = useQuery(SEARCH, {
        variables: { term },
        skip: ! shouldFetch,
        fetchPolicy: 'network-only'
    });
    const onRefresh = async () => {
        try {
            setRefreshing(true);
            await refetch({
                variables: { term }
            });
        } catch (e) {
            console.log(e);
        } finally {
            setRefreshing(false);
        }
    };

    if (loading) {
        return <Loader />;
    }

    if (! loading && data && data.searchPost) {
        return (
            <ScrollView refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}>
                {data.searchPost.map(post => <SquarePhoto key={post.id} {...post} />)}
            </ScrollView>
        );
    }

    return null;
};

SearchPresenter.propTypes = {
    term: PropTypes.string.isRequired,
    shouldFetch: PropTypes.bool.isRequired
};

export default SearchPresenter;
