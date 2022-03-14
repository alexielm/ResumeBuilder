import React, { Component } from 'react';
import './custom.css'

import { LoadQueryParameters } from './generalUtils/Utils';
import { MainBackground } from './components/MainBackground';
import { ResumeViewer } from './components/ResumeViewer';


export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);

        App.QueryParameters = LoadQueryParameters();

        App.SpecialView = App.QueryParameters.BoolValueOrDefault("specialView", false);
    }

    static QueryParameters = null;
    static FrontEndParameters = null;
    static ResumeData = null;
    static SpecialView;

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
                        (<div className="Loading">
                            Loading application configuration...
                        </div>) :
                        <ResumeViewer />
                }
                <MainBackground />
            </div>
        );
    }
}
