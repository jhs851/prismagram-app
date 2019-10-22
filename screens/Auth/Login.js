import React, { useState } from 'react';
import styled from 'styled-components';
import { TouchableWithoutFeedback } from 'react-native';
import AuthButton from '../../components/AuthButton';
import AuthInput from '../../components/AuthInput';
import useInput from '../../hooks/useInput';
import { Alert, Keyboard } from 'react-native';
import { useMutation } from 'react-apollo-hooks';
import { LOG_IN } from './AuthQueries';

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

export default ({ navigation }) => {
    const emailInput = useInput(navigation.getParam('email', ''));
    const [loading, setLoading] = useState(false);
    const [requestSecretMutation] = useMutation(LOG_IN, {
        variables: {
            email: emailInput.value
        }
    });
    const handleLogin = async () => {
        const { value } = emailInput;
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (! emailRegex.test(value)) {
            return Alert.alert('That email is invalid');
        }

        try {
            setLoading(true);
            const {
                data: { requestSecret }
            } = await requestSecretMutation();

            if (requestSecret) {
                Alert.alert('Check your email');
                navigation.navigate('Confirm', { email: value });
            } else {
                Alert.alert('Account not found');
                navigation.navigate('Signup', { email: value });
            }
        } catch (e) {
            Alert.alert('Can\'t log in now');
        } finally {
            setLoading(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <AuthInput {...emailInput}
                           placeholder="Email"
                           keyboardType="email-address"
                           returnKeyType="send"
                           onSubmitEditing={handleLogin}
                           autoCorrect={false}
                />

                <AuthButton text="Log In" onPress={handleLogin} loading={loading} />
            </View>
        </TouchableWithoutFeedback>
    );
};