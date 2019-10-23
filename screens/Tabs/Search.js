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
        headerTitle: (
            <SearchBar
                value={navigation.getParam('term', '')}
                onSubmit={navigation.getParam('onSubmit', () => null)}
                onChange={navigation.getParam('onChange', () => null)}
            />)
    });

    constructor(props) {
        super(props);

        this.state = {
            term: ''
        };

        props.navigation.setParams({
            term: this.state.term,
            onChange: this.onChange,
            onSubmit: this.onSubmit
        });
    }

    onChange = (text) => {
        this.setState({ term: text });

        this.props.navigation.setParams({
            term: text
        });
    };

    onSubmit = () => {
        console.log('submit');
    };

    render() {
        return (
            <View>
                <Text>Search</Text>
            </View>
        );
    }
}