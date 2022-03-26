import React, { Component } from 'react';
import './custom.css'

import { LoadQueryParameters } from './generalUtils/GeneralUtils';
import { ViewSwitch, Then, Else } from './generalUtils/ViewSwitch';
import ViewControl from './generalUtils/ViewControl';
import MainBackground from './components/MainBackground';
import ResumeViewer from './components/ResumeViewer';
import SkillsChartPage from './components/SkillsChartPage';

class App extends Component {
    static displayName = App.name;

    static store = {
        frontEndParameters: null,
        resumeData: null,
        queryParameters: null,

        fetchAll: async () => {
            App.store.parseQueryParamter();
            await App.store.fetchParamaters();
            await App.store.fetchResumeData();
        },

        fetchParamaters: async () => {
            const response = await fetch("api/frontEndParameters");
            App.store.frontEndParameters = await response.json();
        },

        fetchResumeData: async () => {
            const response = await fetch("api/resumeData");
            App.store.resumeData = await response.json();
        },

        refreshResumeData: async () => {
            const response = await fetch("api/refreshResumeData");
            await response.text();
            document.location.reload();
        },

        parseQueryParamter: () => {
            App.store.queryParameters = LoadQueryParameters();
        }
    }

    async componentDidMount() {
        await App.store.fetchAll();
        this.forceUpdate();
    }

    render() {
        switch (App.store.queryParameters?.page) {
            case "skillsChart": {
                return (
                    <div>
                        <SkillsChartPage />
                    </div>
                );
            }
            default: return (
                <div className="MainContainer">
                    <ViewSwitch value={(App.store.frontEndParameters === null) || (App.store.resumeData === null)}>
                        <Then>
                            <div className="Loading">
                                Loading application configuration...
                            </div>
                        </Then>
                        <Else>
                            <ResumeViewer />
                        </Else>
                    </ViewSwitch>
                    <ViewControl visible={!window.MobileView}>
                        <MainBackground />
                    </ViewControl>
                </div>
            );
        }
    }
}

export default App;
