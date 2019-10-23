import React, { Component } from 'react';
import SearchBar from '../../../components/SearchBar';
import SearchPresenter from './SearchPresenter';

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
            term: '',
            shouldFetch: false
        };

        props.navigation.setParams({
            term: this.state.term,
            onChange: this.onChange,
            onSubmit: this.onSubmit
        });
    }

    onChange = (text) => {
        this.setState({ term: text, shouldFetch: false });

        this.props.navigation.setParams({
            term: text
        });
    };

    onSubmit = () => {
        console.log('submit');
        this.setState({ shouldFetch: true });
    };

    render() {
        const { term, shouldFetch } = this.state;

        return <SearchPresenter term={term} shouldFetch={shouldFetch} />;
    }
}