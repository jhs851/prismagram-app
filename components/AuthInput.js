import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import constants from '../constants';

const Container = styled.View`
    margin-bottom: 10px;
`;

const TextInput = styled.TextInput`
    width: ${constants.width / 2};
    padding: 10px;
    background-color: ${props => props.theme.greyColor};
    border: 2px solid ${props => props.theme.darkGreyColor};
    border-radius: 4px;
`;

const AuthInput = ({
   placeholder,
   value,
   keyboardType = 'default',
   autoCapitalize = 'none',
   returnKeyType = 'done',
   autoCorrect = true,
   onChange,
   onEndEditing = () => null
}) => (
    <Container>
        <TextInput placeholder={placeholder}
                   value={value}
                   keyboardType={keyboardType}
                   autoCapitalize={autoCapitalize}
                   returnKeyType={returnKeyType}
                   autoCorrect={autoCorrect}
                   onChangeText={onChange}
                   onEndEditing={onEndEditing}
        />
    </Container>
);

AuthInput.propTypes = {
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    keyboardType: PropTypes.oneOf([
        'default',
        'number-pad',
        'decimal-pad',
        'numeric',
        'email-address',
        'phone-pad',
    ]),
    autoCapitalize: PropTypes.oneOf([
        'characters',
        'words',
        'sentences',
        'none'
    ]),
    onChange: PropTypes.func.isRequired,
    returnKeyType: PropTypes.oneOf([
        'go',
        'next',
        'search',
        'send',
    ]),
    onEndEditing: PropTypes.func,
    autoCorrect: PropTypes.bool
};

export default AuthInput;