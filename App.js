import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons'
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Text, View, AsyncStorage, TouchableOpacity } from 'react-native';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import ApolloClient from 'apollo-boost';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from 'react-apollo-hooks';
import apolloClientOptions from './apollo';
import styles from './styles';

export default function App() {
    const [loaded, setLoaded] = useState(false);
    const [client, setClient] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const preLoad = async () => {
        try {
            await Font.loadAsync({
                ...Ionicons.font
            });
            await Asset.loadAsync([
                require('./assets/logo.png'),
            ]);
            setLoaded(true);

            const cache = new InMemoryCache();
            await persistCache({
                cache,
                storage: AsyncStorage
            });
            const client = new ApolloClient({
                cache,
                ...apolloClientOptions
            });
            setClient(client);

            const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
            if (isLoggedIn === null || JSON.parse(isLoggedIn) === false) {
                setIsLoggedIn(false);
            } else {
                setIsLoggedIn(true);
            }
        } catch (e) {
          console.log(e);
        }
    };
    useEffect(() => {
        preLoad();
    }, []);

    const logUserIn = async () => {
        try {
            await AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
            setIsLoggedIn(true);
        } catch (e) {
            console.log(e);
        }
    };

    const logUserOut = async () => {
        try {
            await AsyncStorage.setItem('isLoggedIn', JSON.stringify(false));
            setIsLoggedIn(false);
        } catch (e) {
            console.log(e);
        }
    };

    return loaded && client && isLoggedIn !== null ? (
        <ApolloProvider client={client}>
            <ThemeProvider theme={styles} />

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {isLoggedIn ? (
                    <TouchableOpacity onPress={logUserOut}>
                        <Text>Log Out</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={logUserIn}>
                        <Text>Log In</Text>
                    </TouchableOpacity>
                )}
            </View>
        </ApolloProvider>
    ) : (
        <AppLoading />
    );
};