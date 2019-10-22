import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import constants from '../constants';
import { ActivityIndicator } from 'react-native';

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
    background-color: ${props => props.theme.blueColor};
    padding: 10px;
    border-radius: 4px;
    margin: 0 50px;
    width: ${constants.width / 2};
`;

const Text = styled.Text`
    color: white;
    text-align: center;
    font-weight: 600;
`;

const AuthButton = ({ text, onPress, loading = false }) => (
    <Touchable onPress={onPress} disabled={loading}>
        <Container>
            {loading ? <ActivityIndicator color="white" /> : <Text>{text}</Text>}
        </Container>
    </Touchable>
);

AuthButton.propTypes = {
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    loading: PropTypes.bool
};

export default AuthButton;