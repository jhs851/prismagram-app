import React, { useState } from 'react';
import { ScrollView, RefreshControl, Text } from 'react-native';
import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo-hooks';

export const SEARCH = gql`
    query searchPost($term: String!) {
        searchPost(term: $term) {
            files {
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
        skip: ! shouldFetch
    });
    const onRefresh = async () => {
        try {
            setRefreshing(true);
            await refetch({
                variables: { term }
            });
        } catch (e) {

        } finally {
            setRefreshing(false);
        }
    };

    return (
        <ScrollView refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}>
            <Text>Hello</Text>
        </ScrollView>
    );
};

SearchPresenter.propTypes = {
    term: PropTypes.string.isRequired,
    shouldFetch: PropTypes.bool.isRequired
};

export default SearchPresenter;
