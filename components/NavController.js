import React from 'react';
import { View } from 'react-native';
import { useIsLoggedIn } from '../AuthContext';
import AuthNavigation from '../navigations/AuthNavigation';
import TabNavigation from '../navigations/TabNavigation';

export default () => {
    const isLoggedIn = true;

    return (
        <View style={{ flex: '1'}}>
            {isLoggedIn ? (
                <TabNavigation />
            ) : (
                <AuthNavigation />
            )}
        </View>
    );
};