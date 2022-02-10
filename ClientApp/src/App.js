import React, { Component } from 'react';
import { ResumeViewer } from './components/ResumeViewer';

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = {
            frontEndParameters: null
        };
    }

    componentDidMount() {
        this.populateFrontEndParameters();
    }

    async populateFrontEndParameters() {
        const response = await fetch('api/frontEndParameters');
        const frontEndParameters = await response.json();
        this.setState({ frontEndParameters });
    }

    render() {
        if (this.state.frontEndParameters === null) {
            return (<div>
                Loading configuration...
            </div>);
        }
        return <ResumeViewer />;
    }
}
