import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';

const SearchBar = ({ value, onChange, onSubmit }) => (
    <TextInput value={value}
               placeholder="Search"
    />
);

SearchBar.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default SearchBar;