import React, { useState } from 'react';
import styled from 'styled-components';
import { TouchableWithoutFeedback } from 'react-native';
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
            </View>
        </TouchableWithoutFeedback>
    );
};