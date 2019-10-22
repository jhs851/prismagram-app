import React from 'react';
import styled from 'styled-components';
import constants from '../../constants';

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

const SignUpBtn = styled.View`
    background-color: ${props => props.theme.blueColor};
    padding: 10px;
    border-radius: 4px;
    margin: 0 50px 25px;
`;

const SignUpBtnText = styled.Text`
    color: white;
    text-align: center;
    font-weight: 600;
`;

const LoginLink = styled.View``;

const LoginLinkText = styled.Text`
    color: ${props => props.theme.blueColor};
`;

export default ({ navigation }) => (
    <View>
        <Image source={require('../../assets/logo.png')} resizeMode="contain" />

        <Touchable onPress={() => navigation.navigate('Signup')}>
            <SignUpBtn>
                <SignUpBtnText>Create New Account</SignUpBtnText>
            </SignUpBtn>
        </Touchable>

        <Touchable onPress={() => navigation.navigate('Login')}>
            <LoginLink>
                <LoginLinkText>Log in</LoginLinkText>
            </LoginLink>
        </Touchable>
    </View>
);