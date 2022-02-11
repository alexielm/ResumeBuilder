import React, { Component } from 'react';
import { MainBackground } from './components/MainBackground';
import { ResumeViewer } from './components/ResumeViewer';

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    static FrontEndParameters = null;

    componentDidMount() {
        this.populateFrontEndParameters();
    }

    async populateFrontEndParameters() {
        const response = await fetch("api/frontEndParameters");
        App.FrontEndParameters = await response.json();
        this.forceUpdate();
    }

    render() {
        return (
            <div className="MainContainer">
                {
                    App.FrontEndParameters === null ?
                        (<div>
                            Loading configuration...
                        </div>) :
                        <ResumeViewer />
                }
                <MainBackground />
            </div>
        );
    }
}
