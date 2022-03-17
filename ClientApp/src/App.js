import React, { Component } from 'react';

import './custom.css'

import { LoadQueryParameters } from './generalUtils/GeneralUtils';
import { Data, LoadFrontEndParameters, LoadResumeData } from './generalUtils/DataUtils';
import { ViewSwitch, ViewCase } from './generalUtils/ViewSwitch';
import { ViewControl } from './generalUtils/ViewControl';
import { MainBackground } from './components/MainBackground';
import { ResumeViewer } from './components/ResumeViewer';
import { SkillsChartPage } from './components/SkillsChartPage';

export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);

        Data.QueryParameters = LoadQueryParameters();
        Data.SpecialView = Data.QueryParameters.BoolValueOrDefault("specialView", false);
    }

    componentDidMount() {
        LoadFrontEndParameters()
            .then(LoadResumeData)
            .then(_ => this.forceUpdate());
    }

    render() {
        switch (Data.QueryParameters.page) {
            case "skillsChart": {
                return (
                    <div>
                        <SkillsChartPage />
                    </div>
                );
            }
            default: return (
                <div className="MainContainer">
                    <ViewSwitch value={(Data.FrontEndParameters === null) || (Data.ResumeData === null)}>
                        <ViewCase case={true}>
                            <div className="Loading">
                                Loading application configuration...
                            </div>
                        </ViewCase>
                        <ViewCase case={false}>
                            <ResumeViewer />
                        </ViewCase>
                    </ViewSwitch>
                    <ViewControl visible={!window.MobileView}>
                        <MainBackground />
                    </ViewControl>
                </div>
            );
        }
    }
}
