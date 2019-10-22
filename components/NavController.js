import React from 'react';
import { View } from 'react-native';
import AuthNavigation from '../navigations/AuthNavigation';
import MainNavigation from '../navigations/MainNavigation';
import { useIsLoggedIn } from '../AuthContext';

export default () => {
    const isLoggedIn = useIsLoggedIn();

    return (
        <View style={{ flex: '1'}}>
            {isLoggedIn ? (
                <MainNavigation />
            ) : (
                <AuthNavigation />
            )}
        </View>
    );
};