import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import constants from '../constants';

const SquarePhoto = ({ navigation, id, files = [] }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Detail', { id })}>
        <Image
            source={{ uri: files[0].url }}
            style={{ width: constants.width / 3, height: constants.height / 6.5 }}
        />
    </TouchableOpacity>
);

SquarePhoto.propTypes = {
    id: PropTypes.string.isRequired,
    files: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired
        })
    ).isRequired
};

export default withNavigation(SquarePhoto);