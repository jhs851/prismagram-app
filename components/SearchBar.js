import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import constants from '../constants';

const TextInput = styled.TextInput`
    width: ${constants.width - 40}px;
    height: 35px;
    background-color: ${props => props.theme.lightGreyColor};
    padding: 10px;
    border-radius: 5px;
    text-align: center;
    color: ${props => props.theme.darkGreyColor};
`;

const SearchBar = ({ value, onChange, onSubmit }) => (
    <TextInput
        returnKeyType="search"
        value={value}
        placeholder="Search"
        onChangeText={onChange}
        onEndEditing={onSubmit}
    />
);

SearchBar.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default SearchBar;