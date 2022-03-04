import React, { Component } from 'react';
import './custom.css'

import { MainBackground } from './components/MainBackground';
import { ResumeViewer } from './components/ResumeViewer';


export default class App extends Component {
    static displayName = App.name;

    static FrontEndParameters = null;
    static ResumeData = null;

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
