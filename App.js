import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons'
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Text, View, AsyncStorage } from 'react-native';
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
            if (isLoggedIn === null || isLoggedIn === false) {
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

    return loaded && client && isLoggedIn !== null ? (
        <ApolloProvider client={client}>
            <ThemeProvider theme={styles} />

            <View>
                {isLoggedIn ? (
                    <Text>I'm in</Text>
                ) : (
                    <Text>I'm out</Text>
                )}
            </View>
        </ApolloProvider>
    ) : (
        <AppLoading />
    );
};