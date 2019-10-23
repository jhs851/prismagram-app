import React from 'react';
import { View, Image, Platform } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Home from '../screens/Tabs/Home';
import Search from '../screens/Tabs/Search/index';
import Notifications from '../screens/Tabs/Notifications';
import Profile from '../screens/Tabs/Profile';
import Detail from '../screens/Detail';
import MessagesLink from '../components/MessagesLink';
import NavIcon from '../components/NavIcon';
import { stackStyles } from './config';
import styles from '../styles';

const stackFactory = (initialRoute, customConfig) =>
    createStackNavigator({
        InitialRoute: {
            screen: initialRoute,
            navigationOptions: {
                ...customConfig
            }
        },
        Detail: {
            screen: Detail,
            navigationOptions: {
                title: 'Photo',
                headerTintColor: styles.blackColor
            }
        }
    }, {
        defaultNavigationOptions: {
            headerStyle: { ...stackStyles }
        }
    });

export default createBottomTabNavigator({
    Home: {
        screen: stackFactory(Home, {
            title: 'Home',
            headerRight: <MessagesLink />,
            headerTitle: <Image
                style={{ height: 35 }}
                resizeMode="contain"
                source={require('../assets/logo.png')} />
        }),
        navigationOptions: {
            tabBarIcon: ({ focused }) => (
                <NavIcon
                    focused={focused}
                    name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'} />
            )
        }
    },
    Search: {
        screen: stackFactory(Search, {
            headerBackTitle: null
        }),
        navigationOptions: {
            tabBarIcon: ({ focused }) => (
                <NavIcon
                    focused={focused}
                    name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'} />
            )
        }
    },
    Add: {
        screen: View,
        navigationOptions: {
            tabBarOnPress: ({ navigation }) => navigation.navigate('PhotoNavigation'),
            tabBarIcon: ({ focused }) => (
                <NavIcon
                    focused={focused}
                    name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'} size={28} />
            )
        }
    },
    Notifications: {
        screen: stackFactory(Notifications, {
            title: 'Notifications'
        }),
        navigationOptions: {
            tabBarIcon: ({ focused }) => (
                <NavIcon
                    focused={focused}
                    name={Platform.OS === 'ios'
                        ? focused
                            ? 'ios-heart'
                            : 'ios-heart-empty'
                        : focused
                            ? 'md-heart'
                            : 'md-heart-empty'}
                />
            )
        }
    },
    Profile: {
        screen: stackFactory(Profile, {
            title: 'Profile'
        }),
        navigationOptions: {
            tabBarIcon: ({ focused }) => (
                <NavIcon
                    focused={focused}
                    name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'} />
            )
        }
    }
}, {
    initialRouteName: 'Search',
    tabBarOptions: {
        showLabel: false,
        style: {
            ...stackStyles
        }
    }
});