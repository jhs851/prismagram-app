import React, { Component } from 'react';
import styled from 'styled-components';
import SearchBar from '../../components/SearchBar';

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const Text = styled.Text``;

export default class extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: <SearchBar value={''} onSubmit={() => null} onChange={this.onChange} />
    });

    state = {
        term: ''
    };

    onChange = (text) => {
        this.setState({ text });
    };

    render() {
        return (
            <View>
                <Text>Search</Text>
            </View>
        );
    }
}