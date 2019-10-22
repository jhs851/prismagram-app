import React, { useState } from 'react';
import styled from 'styled-components';
import { TouchableWithoutFeedback } from 'react-native';
import * as Facebook from 'expo-facebook';
import AuthButton from '../../components/AuthButton';
import AuthInput from '../../components/AuthInput';
import useInput from '../../hooks/useInput';
import { Alert, Keyboard } from 'react-native';
import { useMutation } from 'react-apollo-hooks';
import { CREATE_ACCOUNT } from './AuthQueries';

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const FBContainer = styled.View`
    margin-top: 50px;
    padding-top: 25px;
    border-top-width: 1px;
    border-color: ${props => props.theme.lightGreyColor};
    border-style: solid;
`;

export default ({ navigation }) => {
    const fNameInput = useInput('');
    const lNameInput = useInput('');
    const usernameInput = useInput('');
    const emailInput = useInput(navigation.getParam('email', ''));
    const [loading, setLoading] = useState(false);
    const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
        variables: {
            username: usernameInput.value,
            email: emailInput.value,
            firstName: fNameInput.value,
            lastName: lNameInput.value
        }
    });
    const handleSignup = async () => {
        const { value: email } = emailInput;
        const { value: fName } = fNameInput;
        const { value: lName } = lNameInput;
        const { value: username } = usernameInput;
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (fName === '') {
            return Alert.alert('I need your name');
        }

        if (! emailRegex.test(email)) {
            return Alert.alert('That email is invalid');
        }

        if (username === '') {
            return Alert.alert('Invalid username');
        }

        try {
            setLoading(true);

            const {
                data: { createAccount }
            } = await createAccountMutation();

            if (createAccount) {
                Alert.alert('Account created.', 'Log in now!');
                navigation.navigate('Login', { email });
            }
        } catch (e) {
            Alert.alert('Username taken.', 'Log in instead');
            navigation.navigate('Login', { email });
        } finally {
            setLoading(false);
        }
    };

    const fbLogin = async () => {
        try {
            const { type, token } = await Facebook.logInWithReadPermissionsAsync('490982988296727', {
                permissions: ['public_profile'],
            });
            if (type === 'success') {
                const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
                Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
            } else {
                // type === 'cancel'
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <AuthInput {...fNameInput}
                           placeholder="First name"
                           autoCapitalize="words"
                />

                <AuthInput {...lNameInput}
                           placeholder="Last name"
                           autoCapitalize="words"
                />

                <AuthInput {...emailInput}
                           placeholder="Email"
                           keyboardType="email-address"
                           autoCorrect={false}
                />

                <AuthInput {...usernameInput}
                           placeholder="Username"
                           autoCorrect={false}
                           autoCapitalize="words"
                           returnKeyType="send"
                           onSubmitEditing={handleSignup}
                />

                <AuthButton text="Sign up" onPress={handleSignup} loading={loading} />

                <FBContainer>
                    <AuthButton bgColor="#2d4da7"
                                text="Connect Facebook"
                                onPress={fbLogin}
                                loading={false}
                    />
                </FBContainer>
            </View>
        </TouchableWithoutFeedback>
    );
};