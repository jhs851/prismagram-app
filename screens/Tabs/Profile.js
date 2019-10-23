import React from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { USER_FRAGMENT } from '../../fragments';
import { useQuery } from 'react-apollo-hooks';
import Loader from '../../components/Loader';
import UserProfile from '../../components/UserProfile';

export const ME = gql`
    {
        me {
            ...UserParts
        }
    }
    ${USER_FRAGMENT}
`;

export default () => {
    const {loading, data} = useQuery(ME);

    if (loading) {
        return <Loader />;
    }

    if (! loading && data && data.me) {
        return (
            <ScrollView>
                <UserProfile {...data.me} />
            </ScrollView>
        );
    }

    return null;
};