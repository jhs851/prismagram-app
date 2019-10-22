import React from 'react';
import styled from 'styled-components';
import { TouchableWithoutFeedback } from 'react-native';
import AuthButton from '../../components/AuthButton';
import AuthInput from '../../components/AuthInput';
import useInput from '../../hooks/useInput';
import { Alert, Keyboard } from 'react-native';

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

export default () => {
    const emailInput = useInput('');
    const handleLogin = () => {
        const { value } = emailInput;
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (! emailRegex.test(value)) {
            return Alert.alert('That email is invalid');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <AuthInput {...emailInput}
                           placeholder="Email"
                           keyboardType="email-address"
                           returnKeyType="send"
                           onEndEditing={handleLogin}
                           autoCorrect={false}
                />

                <AuthButton text="Log In" onPress={handleLogin}/>
            </View>
        </TouchableWithoutFeedback>
    );
};