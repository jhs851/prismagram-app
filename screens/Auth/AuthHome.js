import React from 'react';
import styled from 'styled-components';
import constants from '../../constants';
import AuthButton from '../../components/AuthButton';

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const Image = styled.Image`
    width: ${constants.width / 2};
    margin-bottom: 20px;
`;

const Touchable = styled.TouchableOpacity``;

const LoginLink = styled.View`
    margin-top: 20px;
`;

const LoginLinkText = styled.Text`
    color: ${props => props.theme.blueColor};
`;

export default ({ navigation }) => (
    <View>
        <Image source={require('../../assets/logo.png')} resizeMode="contain" />

        <AuthButton text="Create New Account" onPress={() => navigation.navigate('Signup')} />

        <Touchable onPress={() => navigation.navigate('Login')}>
            <LoginLink>
                <LoginLinkText>Log in</LoginLinkText>
            </LoginLink>
        </Touchable>
    </View>
);